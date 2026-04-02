const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const cors = require('cors');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
require('dotenv').config();

const Url = require('./Url');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rota para Encurtar
app.post('/api/shorten', async (req, res) => {
  const { originalUrl, customCode, password, expiresAt } = req.body;

  if (!validator.isURL(originalUrl)) {
    return res.status(400).json({ error: 'URL inválida' });
  }

  try {
    const shortCode = customCode || nanoid(6);
    const existing = await Url.findOne({ shortCode });
    if (existing) return res.status(400).json({ error: 'Código em uso' });

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUrl = new Url({
      originalUrl,
      shortCode,
      password: hashedPassword,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    await newUrl.save();

    // Gerar link completo e QR Code usando o domínio pixelcode
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);

    res.json({ ...newUrl._doc, shortUrl, qrCode: qrCodeDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar link' });
  }
});

// Rota de Redirecionamento e Verificação
app.get('/:code', async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });
  
  if (!url) return res.status(404).send('Link não encontrado');
  if (url.expiresAt && new Date() > url.expiresAt) return res.status(410).send('Link expirado');

  // Se tiver senha, não redireciona direto; avisa o frontend
  if (url.password) {
    return res.send(`
      <html>
        <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
          <h2>Este link está protegido por senha</h2>
          <input type="password" id="pw" placeholder="Senha">
          <button onclick="check()">Acessar</button>
          <script>
            async function check() {
              const p = document.getElementById('pw').value;
              const res = await fetch('/api/verify', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ code: '${req.params.code}', password: p })
              });
              const data = await res.json();
              if(data.url) window.location.href = data.url;
              else alert('Senha incorreta');
            }
          </script>
        </body>
      </html>
    `);
  }

  url.clicks++;
  await url.save();
  res.redirect(url.originalUrl);
});

app.post('/api/verify', async (req, res) => {
  const { code, password } = req.body;
  const url = await Url.findOne({ shortCode: code });
  if (url && await bcrypt.compare(password, url.password)) {
    url.clicks++;
    await url.save();
    return res.json({ url: url.originalUrl });
  }
  res.status(401).json({ error: 'Incorreto' });
});

app.listen(process.env.PORT, () => console.log(`🚀 Servidor PixelCode ativo em http://localhost:${process.env.PORT}`));