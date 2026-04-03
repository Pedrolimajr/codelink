# 🚀 Guia de Deployment - CodeLink

## Preparação para Produção

### 1. Verificar Configurações

Certifique-se que os arquivos `.env.production` estão corretos:

**Backend (`backend/.env.production`):**
```env
MONGO_URI=mongodb+srv://PedroFilho:Qasy47iYaj901081@users.2ksux.mongodb.net/futebol?retryWrites=true&w=majority&appName=users
JWT_PRIVATE_KEY=P@lima2filho1983idade30
PORT=5000
BASE_URL=https://codelink.com
NODE_ENV=production
```

**Frontend (`frontend/.env.production`):**
```env
VITE_API_BASE=https://api.codelink.com
VITE_APP_NAME=CodeLink
```

### 2. Build do Frontend

```bash
cd frontend
npm run build
```

Isso irá gerar uma pasta `dist/` com os arquivos de produção.

### 3. Servir o Frontend

Você pode usar qualquer servidor web estático:

**Opção 1: Express (simples)**
```javascript
import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('frontend/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend/dist/index.html'));
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

**Opção 2: Nginx**
```nginx
server {
    listen 80;
    server_name codelink.com;

    location / {
        root /var/www/codelink/frontend/dist;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Opção 3: Vercel / Netlify**
- Conectar repositório do GitHub
- Configurar build command: `npm run build`
- Configurar output directory: `dist`

### 4. Deploy do Backend

**Opção 1: Railway.app**
```bash
# Instalar CLI
npm install -g railway

# Fazer login
railway login

# Deploy
railway up
```

**Opção 2: Render.com**
- Conectar repositório GitHub
- Configurar como Web Service
- Build command: `npm install`
- Start command: `npm start`

**Opção 3: Koyeb (Recomendado)**
- Conectar repositório GitHub
- Definir "Work Directory" como `backend`
- Configurar variáveis de ambiente (`MONGO_URI`, `JWT_PRIVATE_KEY`, etc.)
- O plano "Nano" é gratuito e evita o "cold start" (sono) do app.
- Build command: `npm install`

**Opção 4: Back4App Containers (Recomendado - Gratuito e Sem Cartão)**
- Vá em "Build new app" -> "Containers"
- **Name:** `codelink-backend`
- **Build and Deploy:** `Yes`
- **Root Directory:** `backend`
- **Dockerfile Path:** `Dockerfile` (Nota: Se usar Root Directory 'backend', não repita a pasta aqui)
- **Health:** `/api/health`
- **Importante:** Se o erro "Dockerfile not found" persistir, verifique se o arquivo foi enviado ao GitHub sem a extensão .txt.
- **Dica:** É normal ver erros de "port 5000 not listening" nos primeiros segundos do log enquanto o servidor inicia.
- **Solução "URL Expirada":** Caso receba a mensagem de URL expirada, vá em **Deployment** -> **Redeploy** no painel do Back4App para reativar o link gratuito.
- **Environment Variables:** Adicionar `MONGO_URI`, `JWT_PRIVATE_KEY`, `NODE_ENV=production`, `PORT=5000`.
- **Nota:** A `BASE_URL` deve ser atualizada após o deploy com a URL `.back4app.io` gerada.
- Excelente estabilidade para APIs Node.js.

**Opção 5: Adaptable.io (Focado em Node.js)**
- Conecte o repositório
- Selecione o template "Node.js App"
- Ele detecta automaticamente o MongoDB e as configurações do Express.
**Opção 4: Heroku**
```bash
heroku create codelink-api
git push heroku main
heroku config:set MONGO_URI="seu_uri_aqui"
heroku config:set JWT_PRIVATE_KEY="sua_chave_aqui"
```

**Opção 4: AWS EC2**
```bash
# SSH no servidor
ssh -i key.pem ubuntu@seu-ip

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar repositório
git clone seu-repo.git
cd PixelCodeIA/backend

# Instalar dependências
npm install

# Usar PM2 para manter o servidor rodando
npm install -g pm2
pm2 start server.js --name "codelink-api"
pm2 startup
pm2 save
```

### 5. SSL/HTTPS

**Usar Let's Encrypt com Certbot:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d codelink.com -d www.codelink.com
```

### 6. Variáveis de Ambiente em Produção

Nunca commite arquivos `.env` no git! Use um manager de secrets:

- **Railway**: Railway Variables
- **Render**: Environment Variables
- **Heroku**: Config Vars
- **AWS**: AWS Secrets Manager
- **GitLab**: Protected Variables

### 7. Monitoramento

**Uptime Monitoring:**
- Uptime Robot (uptime.com)
- Pingdom (pingdom.com)
- StatusCake (statuscake.com)

**Log Aggregation:**
- LogRocket
- Sentry para erros
- DataDog

### 8. Otimizações

**Backend:**
- Usar compression middleware
- Implementar rate limiting
- Cache com Redis
- CDN para arquivos estáticos

**Frontend:**
- Lazy loading de componentes
- Tree shaking
- Code splitting
- Minficar assets

### 9. Checklist Pré-Deploy

- [ ] Conexão MongoDB testada
- [ ] Variables de .env.production corretas
- [ ] Build do frontend sem erros (`npm run build`)
- [ ] Teste de API endpoints
- [ ] CORS configurado corretamente
- [ ] Headers de segurança adicionados
- [ ] Rate limiting implementado
- [ ] Logs configurados
- [ ] Backup do banco de dados
- [ ] SSL/HTTPS ativo
- [ ] Domínio apontando para o servidor
- [ ] Health check respondendo
- [ ] Test de redirecionamento de URLs

### 10. Rollback

Em caso de problemas:

```bash
# Voltar para última versão conhecida boa
git revert HEAD
npm install
npm start
```

---

**Suporte e Ajuda:**
Se encontrar problemas com o deployment, verifique:
1. Logs do servidor (`npm start` ou verificar cloud provider)
2. Conexão MongoDB (teste credenciais)
3. Firewall/Security Groups
4. DNS propagation (esperar até 48h)
5. CORS headers
