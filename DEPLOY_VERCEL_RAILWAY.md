# 🚀 GUIA PASSO A PASSO DEPLOY VERCEL + RAILWAY

## ⚙️ PARTE 1: PREPARAR O GITHUB

### Passo 1: Fazer Login no GitHub
- Acesse: https://github.com
- Faça login com sua conta

### Passo 2: Criar um Repositório
1. Clique no "+" no canto superior direito
2. Clique em "New repository"
3. Nome: **codelink**
4. Descrição: "Encurtador de URLs inteligente"
5. Marque: **Public**
6. Clique em "Create repository"

### Passo 3: Fazer Upload do Projeto

Abra o PowerShell na pasta `C:\Junior\PixelCodeIA` e execute:

```powershell
# Inicializar git
git init
git add .
git commit -m "Initial commit: CodeLink project"

# Adicionar repositório remoto
git remote add origin https://github.com/SEU_USUARIO/codelink.git

# Fazer upload
git branch -M main
git push -u origin main
```

**Trocar `SEU_USUARIO` pelo seu usuário do GitHub!**

---

## 🚂 PARTE 2: DEPLOY BACKEND (Railway)

### Passo 1: Acessar Railway
- Acesse: https://railway.app
- Clique em "Login"
- Selecione "Login with GitHub"
- Autorize o acesso

### Passo 2: Criar Novo Projeto
1. Clique em "New Project"
2. Clique em "Deploy from GitHub repo"
3. Procure por "codelink" e selecione
4. Clique em "Deploy"

### Passo 3: Configurar Variáveis de Ambiente
1. Clique na aba "Variables"
2. Clique em "New Variable"
3. Adicione cada uma:

```
MONGO_URI = mongodb+srv://PedroFilho:Qasy47iYaj901081@users.2ksux.mongodb.net/futebol?retryWrites=true&w=majority&appName=users

JWT_PRIVATE_KEY = P@lima2filho1983idade30

PORT = 5000

BASE_URL = (Railway vai gerar uma URL automática - deixe em branco por enquanto)

NODE_ENV = production
```

### Passo 4: Obter a URL do Backend
1. Clique na aba "Deployments"
2. Copie a URL gerada (tipo: `https://codelink-backend-production.up.railway.app`)
3. Volte na aba "Variables"
4. Edite `BASE_URL` e cole a URL

⚠️ **SALVE ESTA URL! Você vai precisar dela no Vercel!**

---

## 🎨 PARTE 3: DEPLOY FRONTEND (Vercel)

### Passo 1: Acessar Vercel
- Acesse: https://vercel.com
- Clique em "Sign Up"
- Selecione "Continue with GitHub"
- Autorize o acesso

### Passo 2: Criar Novo Projeto
1. Clique em "New Project"
2. Na seção "Import Git Repository", procure por "codelink"
3. Clique em "Import"

### Passo 3: Configurar Projeto

**Framework Preset**: Selecione "Vite"

**Root Directory**: Clique em "Edit" e selecione "frontend" (ou Digite `frontend`)

### Passo 4: Adicionar Variáveis de Ambiente

Na seção "Environment Variables":

1. Clique em "Add"
2. **Name**: `VITE_API_BASE`
3. **Value**: Cole a URL do Railway que você salvou (tipo: `https://codelink-backend-production.up.railway.app`)
4. Clique em "Add"
5. Repita para a segunda variável:
   - **Name**: `VITE_APP_NAME`
   - **Value**: `CodeLink`

### Passo 5: Deploy
1. Clique em "Deploy"
2. Aguarde (leva uns 2-5 minutos)
3. Quando aparecer "Congratulations!", seu site está ao vivo! 🎉

⚠️ **COPIE A URL QUE APARECE!** Tipo: `https://codelink.vercel.app`

---

## ✅ TESTAR

1. Abra a URL do Vercel em seu navegador
2. Teste encurtar uma URL
3. Verifique se o QR Code aparece
4. Teste clicar no link encurtado

---

## 🔗 URLS FINAIS

- 🌐 **Frontend**: https://codelink.vercel.app
- 📡 **Backend API**: https://codelink-backend-production.up.railway.app
- 📊 **Health Check**: https://codelink-backend-production.up.railway.app/api/health

---

## 🆘 TROUBLESHOOTING

### "Erro ao conectar com MongoDB"
- Verifique se a `MONGO_URI` está correta no Railway

### "CORS Error"
- Verifique se a `VITE_API_BASE` no Vercel está apontando certo

### "Link não redireciona"
- Verifique se o `BASE_URL` no Railway está preenchido com a URL correta

### "Para depois de uns segundos"
- Deploy gratuito no Railway coloca em sleep. Pague por Hobby ($5/mês) para manter sempre ativo

---

## 💳 PRÓXIMAS ETAPAS (Recomendadas)

1. **Domínio Personalizado**
   - Compre em namecheap.com
   - Adicione no Vercel (Settings → Domains)
   - Configure DNS

2. **Melhorar Performance**
   - Railway Hobby Plan ($5/mês): Mantém backend sempre ativo
   - Vercel: Já está otimizado

3. **Monitoramento**
   - Uptime Robot: Monitora se seu site está on
   - Sentry: Rastreia erros

---

## 📞 DÚVIDAS?

Se tiver problemas em algum passo, me avise qual e vou ajudar!

**Boa sorte! 🚀**
