import express from 'express';
import { createProxyMiddleware } from 'express-http-proxy';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir frontend estático
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Proxy para API
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
}));

// Proxy para redirecionamentos de URLs curtas
app.use('/:code', (req, res, next) => {
  // Se não tiver ponto e tiver 2-20 caracteres, é um código de URL
  if (req.params.code !== 'favicon.ico' && !req.params.code.includes('.')) {
    return createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })(req, res, next);
  }
  next();
});

// Fallback para index.html (para SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`\n🚀 CodeLink Proxy rodando em http://codelink${PORT !== 80 ? ':' + PORT : ''}`);
  console.log(`📡 Backend: http://localhost:5000`);
  console.log(`🎨 Frontend: http://codelink\n`);
});
