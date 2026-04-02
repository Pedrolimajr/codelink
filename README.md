# 🔗 CodeLink - Encurtador de URLs Inteligente

Bem-vindo ao **CodeLink**! Um encurtador de URLs moderno, seguro e com funcionalidades avançadas.

## ✨ Funcionalidades

- 🔗 Encurtar URLs com código personalizado
- 🔐 Proteção com senha para links
- ⏰ Expiração automática de links
- 📊 QR Code gerado automaticamente
- 📈 Contador de cliques
- 🎨 Interface moderna e responsiva
- 🚀 Performance otimizada

## 🛠️ Requisitos

- Node.js 16+
- npm ou yarn
- MongoDB Atlas (já configurado com as credenciais fornecidas)

## 📦 Instalação

### 1. Clonar o repositório
```bash
git clone <repositório>
cd PixelCodeIA
```

### 2. Instalar dependências

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## 🚀 Como Usar

### Em Desenvolvimento

**Opção 1: Scripts Automáticos**

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
./start.sh
```

**Opção 2: Manualmente**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Depois acesse: http://localhost:5173

### Em Produção

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📝 Configuração

### Variáveis de Ambiente

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://PedroFilho:Qasy47iYaj901081@users.2ksux.mongodb.net/futebol?retryWrites=true&w=majority&appName=users
JWT_PRIVATE_KEY=P@lima2filho1983idade30
PORT=5000
BASE_URL=http://localhost:5000
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_BASE=http://localhost:5000
VITE_APP_NAME=CodeLink
```

## 🔌 API Endpoints

### POST `/api/shorten`
Encurtar uma URL

**Request:**
```json
{
  "originalUrl": "https://exemplo.com/url-muito-longa",
  "customCode": "meu-link",
  "password": "senha123",
  "expiresAt": "2026-12-31"
}
```

**Response:**
```json
{
  "_id": "...",
  "originalUrl": "https://exemplo.com/url-muito-longa",
  "code": "meu-link",
  "shortUrl": "http://localhost:5000/meu-link",
  "qrCode": "data:image/png;base64,...",
  "clicks": 0,
  "createdAt": "2026-04-01T...",
  "expiresAt": "2026-12-31T..."
}
```

### GET `/:code`
Redirecionar para URL original

### GET `/api/url/:code`
Obter informações do link

### DELETE `/api/url/:code`
Deletar um link

### GET `/api/urls`
Listar todas as URLs

### GET `/api/health`
Verificar saúde da API

## 📂 Estrutura do Projeto

```
PixelCodeIA/
├── backend/
│   ├── models/
│   │   └── Url.js
│   ├── .env
│   ├── .env.production
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.production
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
├── start.bat
└── start.sh
```

## 🔐 Segurança

- Senhas são criptografadas com bcryptjs (10 rounds)
- Validação de URLs em tempo real
- CORS habilitado
- Tokens JWT para futuras autenticações

## 📊 Banco de Dados

Conectado ao MongoDB Atlas com a seguinte coleção:
- **Database:** futebol
- **Collection:** urls

Schema:
```javascript
{
  originalUrl: String (required),
  code: String (unique, required),
  shortUrl: String (required),
  password: String (optional, hashed),
  expiresAt: Date (optional),
  clicks: Number,
  createdAt: Date,
  createdBy: ObjectId (optional)
}
```

## 🆘 Troubleshooting

### "MongoDB connection error"
- Verifique sua conexão com a internet
- Verifique se as credenciais estão corretas no `.env`
- Verifique se o IP está autorizado no MongoDB Atlas

### "Cannot GET /"
- Certifique-se que o frontend está sendo servido na porta 5173
- Verifique se o backend está rodando na porta 5000

### "QR Code não aparece"
- Certifique-se que o comando `npm install` foi executado no backend
- Verifique se a dependência `qrcode` está instalada

## 📝 Licensça

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

**CodeLink** - Tornando links mais curtos e mais inteligentes! 🚀
