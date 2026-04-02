# 👨‍💻 Guia de Desenvolvimento - CodeLink

## Estrutura do Projeto

```
PixelCodeIA/
├── backend/
│   ├── models/
│   │   └── Url.js          # Schema MongoDB para URLs
│   ├── .env                # Variáveis de desenvolvimento
│   ├── .env.production     # Variáveis de produção
│   ├── package.json
│   └── server.js           # Servidor Express
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Entrada do React
│   ├── index.html          # HTML template
│   ├── .env                # Variáveis de desenvolvimento
│   ├── .env.production     # Variáveis de produção
│   ├── package.json
│   ├── vite.config.js      # Configuração Vite
│   └── dist/               # Build de produção (gerado)
├── .gitignore
├── start.bat               # Script para iniciar em Windows
├── start.sh                # Script para iniciar em Unix
├── package.json            # Configuração raiz
├── README.md               # Documentação principal
├── DEPLOYMENT.md           # Guia de deployment
└── DEVELOPMENT.md          # Este arquivo
```

## Instalação Inicial

```bash
# Clonar ou extrair o repositório
cd PixelCodeIA

# Instalar dependências
cd backend && npm install
cd ../frontend && npm install
```

## Desenvolvimento

### Iniciar os Servidores

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
./start.sh
```

**Manualmente (Recomendado):**

Terminal 1 - Backend:
```bash
cd backend
npm run dev    # ou npm start para produção
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Acesse: http://localhost:5173

### Estrutura de Arquivos do Backend

```
backend/
├── models/
│   └── Url.js
│       - Schema MongoDB
│       - Métodos: isExpired(), validation
├── server.js
│       - Configuração Express
│       - Middleware (CORS, JSON, dotenv)
│       - Rotas POST /api/shorten
│       - Rotas GET /:code (redirecionamento)
│       - Rotas GET /api/url/:code
│       - Rotas DELETE /api/url/:code
│       - Rotas GET /api/urls
│       - Rotas GET /api/health
├── .env ────────→ MONGO_URI, JWT_PRIVATE_KEY, PORT, etc.
└── package.json
```

### Estrutura de Arquivos do Frontend

```
frontend/
├── src/
│   ├── App.jsx
│   │   - Hook useState para form data
│   │   - Função handleSubmit (axios POST)
│   │   - Função copyToClipboard
│   │   - JSX muito bonito com Tailwind CSS
│   │   - Ícones do lucide-react
│   │
│   └── main.jsx
│       - React.createRoot
│       - Renderiza <App />
│
├── index.html
│   - Meta tags
│   - Tailwind CSS CDN
│   - Div#root
│
└── vite.config.js
    - Configuração vite
    - Plugin React
    - Porta 5173
```

## Variáveis de Ambiente

### Backend (.env)

```env
# MongoDB
MONGO_URI=mongodb+srv://...

# Segurança
JWT_PRIVATE_KEY=sua-chave-secreta-aqui

# Servidor
PORT=5000
BASE_URL=http://localhost:5000

# Ambiente
NODE_ENV=development
```

### Frontend (.env)

```env
# API
VITE_API_BASE=http://localhost:5000

# App
VITE_APP_NAME=CodeLink
```

## Dependências Principais

### Backend
- **express**: Framework web
- **mongoose**: ODM MongoDB
- **bcryptjs**: Hash de senhas
- **qrcode**: Geração de QR codes
- **cors**: CORS middleware
- **dotenv**: Variáveis de ambiente
- **shortid**: Geração de IDs curtos
- **jsonwebtoken**: JWT tokens

### Frontend
- **react**: UI library
- **react-dom**: React DOM  
- **axios**: HTTP client
- **lucide-react**: Ícones
- **tailwindcss**: Utility CSS Framework
- **vite**: Build tool

## Fluxo de Desenvolvimento

### 1. Adicionar Nova Feature no Backend

```javascript
// backend/server.js

app.post('/api/nova-rota', async (req, res) => {
  try {
    const { dado } = req.body;
    
    // Validação
    if (!dado) {
      return res.status(400).json({ error: 'Dado obrigatório' });
    }
    
    // Lógica
    const resultado = await MinhaModel.create(dado);
    
    // Resposta
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao processar' });
  }
});
```

### 2. Chamar API no Frontend

```javascript
// frontend/src/App.jsx

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const response = await axios.post(`${API_BASE}/api/nova-rota`, {
  dado: 'valor'
});

const dados = response.data;
```

### 3. Estilizar com Tailwind

```jsx
// Tailwind utility classes
<div className="py-12 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
  <h1 className="text-4xl font-bold text-white">Título</h1>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
    Botão
  </button>
</div>
```

## Debugging

### Backend Debugging

```bash
# Adicionar console.log
console.log('Debug:', variavel);

# Ver logs em tempo real
npm run dev    # com nodemon, mostra erros automaticamente

# Usar debugger do Node.js
node --inspect server.js
# Abrir chrome://inspect no Chrome
```

### Frontend Debugging

```bash
# Abrir DevTools do navegador
F12

# Ver console.log em App.jsx
console.log('Debug Frontend:', estado);

# Usar React DevTools (extensão do Chrome)
```

### MongoDB Debugging

```bash
# Conectar ao MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"

# Ver coleções
show collections

# Ver documentos
db.urls.find().pretty()

# Contar documentos
db.urls.countDocuments()
```

## Testes

### Testar API com cURL

```bash
# Criar link curto
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "originalUrl": "https://google.com",
    "customCode": "google",
    "password": "senha123"
  }'

# Redirecionar
curl http://localhost:5000/google

# Obter info do link
curl http://localhost:5000/api/url/google

# Health check
curl http://localhost:5000/api/health
```

### Testar API com Postman

1. Importar collection (criar endpoints manualmente)
2. Set variables
3. Fazer requisições

### Testar Frontend

```bash
# Abrir navegador em http://localhost:5173
# Testar submit de forms
# Verificar console para erros (F12)
# Testar responsividade (F12 → Toggle device toolbar)
```

## Boas Práticas

### Backend
✅ Validar entrada do usuário
✅ Usar try-catch em async/await
✅ Retornar mensagens de erro claras
✅ Usar const para não reatribuir
✅ Comentar código complexo
✅ Usar HTTPS em produção
✅ Rate limiting em produção

### Frontend
✅ Usar componentes reutilizáveis
✅ Manter estado em um local central
✅ Validar inputs antes de enviar
✅ Mostrar loading states
✅ Mensagens de erro user-friendly
✅ Responsividade mobile-first
✅ Acessibilidade (alt text, labels)

### MongoDB
✅ Usar índices em campos buscados frequentemente
✅ Validação no schema
✅ TTL para expiração automática
✅ Backups regulares

## Commits Úteis

```bash
# Workflow recomendado
git add .
git commit -m "feat: adicionar nova feature X"
git push origin main

# Tipos de commit
git commit -m "feat: nova funcionalidade"    # Nova feature
git commit -m "fix: corrigir bug X"          # Correção de bug
git commit -m "docs: atualizar README"       # Documentação
git commit -m "style: formatar código"       # Formatação
git commit -m "refactor: reorganizar código" # Refatoração
git commit -m "test: adicionar testes"       # Testes
git commit -m "chore: atualizar deps"        # Manutenção
```

## Troubleshooting Comum

### "Module not found"
```bash
npm install  # Reinstalar dependências
```

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID 12345 /F

# macOS/Linux
lsof -i :5000
kill -9 12345
```

### "CORS error"
```javascript
// Backend - verificar CORS
app.use(cors());
```

### "MongoDB connection failed"
```bash
# Verificar credenciais em .env
# Verificar IP whitelist no MongoDB Atlas
# Verificar conexão de internet
```

### "Vite failed to start"
```bash
npm install  # Reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Performance

### Backend
- Usar índices no MongoDB
- Implementar caching com Redis
- Compression middleware
- Rate limiting

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

## Mais Informações

- [Express Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

**Desenvolvido com ❤️ por [Seu Nome]**
