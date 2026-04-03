import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import shortid from 'shortid';
import bcryptjs from 'bcryptjs';
import QRCode from 'qrcode';
import Url from './models/Url.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Variáveis
// Remove a barra final da URL se existir para evitar links gerados com //
const BASE_URL = (process.env.BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Conexão MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('✅ MongoDB conectado com sucesso'))
.catch(err => {
  console.error('❌ Erro ao conectar MongoDB:', err.message);
  process.exit(1);
});

// Middleware para validar URL
const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    // Aceita apenas protocolos web seguros
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// POST - Encurtar URL
app.post('/api/shorten', async (req, res) => {
  try {
    const { originalUrl, customCode, password, expiresAt } = req.body;

    // Validações
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL original é obrigatória' });
    }

    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: 'URL inválida' });
    }

    // Verificar se a URL já existe
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl && !existingUrl.isExpired()) {
      const qrCode = await QRCode.toDataURL(existingUrl.shortUrl);
      return res.status(200).json({
        ...existingUrl.toObject(),
        qrCode
      });
    }

    // Gerar código customizado ou aleatório
    let code = customCode || shortid.generate();
    
    // Verificar se o código já existe
    let codeExists = await Url.findOne({ code: code.toLowerCase() });
    while (codeExists && !codeExists.isExpired()) {
      code = shortid.generate();
      codeExists = await Url.findOne({ code: code.toLowerCase() });
    }

    // Encriptar senha se fornecida
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    // Criar documento da URL
    const newUrl = new Url({
      originalUrl,
      code: code.toLowerCase(),
      shortUrl: `${BASE_URL}/${code.toLowerCase()}`,
      password: hashedPassword,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    await newUrl.save();

    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(newUrl.shortUrl);

    res.status(201).json({
      ...newUrl.toObject(),
      qrCode
    });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    res.status(500).json({ error: 'Erro ao processar link' });
  }
});

// GET - Redirecionar para URL original
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { password } = req.query;

    const url = await Url.findOne({ code: code.toLowerCase() });

    if (!url) {
      return res.status(404).json({ error: 'Link não encontrado' });
    }

    // Verificar expiração
    if (url.isExpired()) {
      await Url.deleteOne({ _id: url._id });
      return res.status(404).json({ error: 'Link expirado' });
    }

    // Verificar senha
    if (url.password) {
      if (!password) {
        return res.status(401).json({ error: 'Senha obrigatória' });
      }

      const isValidPassword = await bcryptjs.compare(password, url.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
    }

    // Incrementar clicks
    url.clicks += 1;
    await url.save();

    // Redirecionar
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Erro ao redirecionar:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

// GET - Obter informações da URL (sem redirecionar)
app.get('/api/url/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ code: code.toLowerCase() });

    if (!url) {
      return res.status(404).json({ error: 'Link não encontrado' });
    }

    // Verificar expiração
    if (url.isExpired()) {
      await Url.deleteOne({ _id: url._id });
      return res.status(404).json({ error: 'Link expirado' });
    }

    // Gerar QR Code
    const qrCode = await QRCode.toDataURL(url.shortUrl);

    res.json({
      ...url.toObject(),
      qrCode
    });
  } catch (error) {
    console.error('Erro ao obter URL:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

// DELETE - Deletar URL
app.delete('/api/url/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOneAndDelete({ code: code.toLowerCase() });

    if (!url) {
      return res.status(404).json({ error: 'Link não encontrado' });
    }

    res.json({ message: 'Link deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar URL:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

// GET - Buscar todas as URLs
app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(urls);
  } catch (error) {
    console.error('Erro ao buscar URLs:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor CodeLink ativo' });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`\n🚀 CodeLink Backend rodando na porta ${PORT}`);
  console.log(`📝 Acesse: http://localhost:3000 (frontend)\n`);
});

// Fechamento limpo do servidor (Graceful Shutdown)
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Fechando servidor HTTP...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Conexão MongoDB encerrada.');
      process.exit(0);
    });
  });
});
