# ⚡ Quick Start - CodeLink

## 🚀 3 Passos para Começar

### 1️⃣ Instalar Dependências
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2️⃣ Iniciar Servidores

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
./start.sh
```

**Manual (em 2 terminais):**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend  
npm run dev
```

### 3️⃣ Acessar
- 🌐 Frontend: http://localhost:5173
- 📡 Backend API: http://localhost:5000
- 📊 Health Check: http://localhost:5000/api/health

---

## 📋 Checklist

- [x] ✅ Nome mudado para "CodeLink"
- [x] ✅ MongoDB conectado com credenciais fornecidas
- [x] ✅ Backend pronto na porta 5000
- [x] ✅ Frontend pronto na porta 5173
- [x] ✅ Geração automática de QR Code
- [x] ✅ Variáveis de ambiente configuradas
- [x] ✅ Scripts de inicialização criados
- [x] ✅ Documentação completa

---

## 🔗 API Endpoints

```http
# Encurtar URL
POST /api/shorten
Body: {
  "originalUrl": "https://exemplo.com",
  "customCode": "meulink",
  "password": "senha123",
  "expiresAt": "2026-12-31"
}

# Redirecionar (automático)
GET /:code

# Obter info do link
GET /api/url/:code

# Deletar link
DELETE /api/url/:code

# Listar todas URLs
GET /api/urls

# Health check
GET /api/health
```

---

## 🛠️ Próximos Passos (Opcional)

1. **Deploy no Render.com ou Railway.app**
   - Ver [DEPLOYMENT.md](DEPLOYMENT.md)

2. **Adicionar Autenticação**
   - Implementar JWT no backend
   - Login/Registro no frontend

3. **Dashboard de Usuário**
   - Listar URLs do usuário
   - Editar/Deletar URLs
   - Ver estatísticas

4. **Admin Panel**
   - Gerenciar todas as URLs
   - Ver estatísticas globais
   - Configurações

---

## 📞 Suporte

Se tiver dúvidas, consulte:
- [README.md](README.md) - Documentação principal
- [DEVELOPMENT.md](DEVELOPMENT.md) - Guia de desenvolvimento
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guia de deployment

---

**🎉 Pronto para usar! Boa sorte! 🚀**
