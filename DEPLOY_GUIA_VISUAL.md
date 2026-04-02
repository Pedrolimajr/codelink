# 📱 GUIA VISUAL COMPLETO - PUBLICAR SEU SITE

## 🎯 OBJETIVO
Após seguir este guia, seu site estará em: **https://codelink.vercel.app** ✨

---

## 🔐 PASSO 1: CRIAR CONTA GITHUB (2 min)

### 1.1 Acessar GitHub
- Abra: https://github.com
- Clique em "Sign up"

### 1.2 Preencher Dados
- Email: Seu email
- Senha: Crie uma senha forte
- Username: Algo como `seu-nome-123`
- Clique em "Create account"

### 1.3 Confirmar Email
- Abra seu email
- Clique no link de confirmação

✅ **Você agora tem uma conta GitHub!**

---

## 📤 PASSO 2: FAZER UPLOAD DO CÓDIGO (5 min)

### 2.1 Abrir PowerShell

1. Pressione `Win + R`
2. Digite: `powershell`
3. Pressione Enter

### 2.2 Navegar para a Pasta

```powershell
cd C:\Junior\PixelCodeIA
```

### 2.3 Executar o Script de Upload

**Opção A: Automática (Recomendado)**
```powershell
.\push-github.bat
```

Depois:
- Digite seu usuário do GitHub
- Digite: `codelink`
- Pressione Enter e autorize no GitHub se pedir

**Opção B: Manual**
```powershell
git init
git add .
git commit -m "Initial commit: CodeLink"
git remote add origin https://github.com/SEU_USUARIO/codelink.git
git branch -M main
git push -u origin main
```

Trocar `SEU_USUARIO` pelo seu nome no GitHub!

✅ **Seu código está no GitHub!**

---

## 🚂 PASSO 3: DEPLOY DO BACKEND (Railway) - 10 MIN

### 3.1 Acessar Railway

1. Abra: https://railway.app
2. Clique em "Start Free"
3. Clique em "Continue with GitHub"
4. Autorize o acesso

### 3.2 Criar um Novo Projeto

1. Clique em "New Project"
2. Clique em "Deploy from GitHub repo"
3. Procure por "codelink"
4. Clique em "codelink" (seu repositório)
5. Clique em "Deploy" (no painel da direita)

💡 Vai levar uns 2 minutos para começar...

### 3.3 Configurar Variáveis de Ambiente

1. Quando o deploy terminar, clique na aba **"Variables"**
2. Clique em **"New Variable"**
3. Preencha cada uma:

#### Variável 1: MONGO_URI
- **Name**: `MONGO_URI`
- **Value**: 
```
mongodb+srv://PedroFilho:Qasy47iYaj901081@users.2ksux.mongodb.net/futebol?retryWrites=true&w=majority&appName=users
```
- Clique em "Add"

#### Variável 2: JWT_PRIVATE_KEY
- **Name**: `JWT_PRIVATE_KEY`
- **Value**: `P@lima2filho1983idade30`
- Clique em "Add"

#### Variável 3: NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- Clique em "Add"

#### Variável 4: PORT
- **Name**: `PORT`
- **Value**: `5000`
- Clique em "Add"

### 3.4 Obter a URL do Backend

1. Clique na aba **"Deploy logs"** ou **"Deployments"**
2. Você vai ver uma URL tipo:
   ```
   https://codelink-production-xxxx.railway.app
   ```
3. **COPIE ESSA URL!** Você vai precisar dela no próximo passo

✅ **Backend está rodando na nuvem!**

---

## 🎨 PASSO 4: DEPLOY DO FRONTEND (Vercel) - 10 MIN

### 4.1 Acessar Vercel

1. Abra: https://vercel.com
2. Clique em "Sign Up"
3. Clique em "Continue with GitHub"
4. Autorize o acesso

### 4.2 Criar Novo Projeto

1. Clique em "Add New"
2. Clique em "Project"
3. Procure por "codelink"
4. Clique em "Import"

### 4.3 Configurar o Projeto

1. **Framework Preset**: Deixe como está ou selecione "Vite"
2. **Root Directory**: 
   - Clique em "Edit"
   - Selecione "frontend"
   - Ou digite: `frontend`

### 4.4 Adicionar Variáveis de Ambiente

**Antes de clicar em Deploy!**

1. Clique na aba **"Environment Variables"**
2. Clique em "Add"
3. Adicione a primeira variável:
   - **Name**: `VITE_API_BASE`
   - **Value**: Cole a URL do Railway que você copiou (tipo: `https://codelink-production-xxxx.railway.app`)
   - Clique em "Add"

4. Clique em "Add" novamente:
   - **Name**: `VITE_APP_NAME`
   - **Value**: `CodeLink`
   - Clique em "Add"

### 4.5 Fazer o Deploy

1. Clique em "Deploy"
2. Aguarde uns 3-5 minutos
3. Quando aparecer "Congratulations!" em verde, está pronto!

### 4.6 Obter a URL do Frontend

1. Você vai ver algo como:
   ```
   Congratulations! Your project has been successfully deployed.
   Visit https://codelink.vercel.app
   ```

2. **COPIE ESSA URL!** Esse é o seu site ao vivo!

✅ **Seu site está publicado na internet!**

---

## 🧪 PASSO 5: TESTAR TUDO

### 5.1 Abrir o Site

1. Copie a URL do Vercel: `https://codelink.vercel.app`
2. Cole no seu navegador
3. Você deve ver a homepage do CodeLink

### 5.2 Testar Funcionalidades

1. **Encurtar uma URL**:
   - Cole: `https://www.google.com`
   - Clique em "Encurtar Agora"
   - Verifique se aparece um link curto e um QR Code

2. **Copiar Link**:
   - Clique no botão de copiar
   - Uma mensagem deve aparecer

3. **Acessar Link Curto**:
   - Em outra aba, vá para: `https://codelink.vercel.app/seu-link-aqui`
   - Deve redirecionar para a URL original

### 5.3 Testar Avançado (Opcional)

1. Encurte com: `customCode: "google"`
2. Encurte com: `password: "senha123"` e `expiresAt: data futura`
3. Adicione: `expiresAt: 2020-01-01` para testar expiração

✅ **Tudo funcionando!**

---

## 🎉 RESUMO FINAL

Seu site agora está:

| Componente | URL | Status |
|-----------|-----|--------|
| 🎨 Frontend | https://codelink.vercel.app | ✅ LIVE |
| 📡 Backend | https://codelink-production-xxxx.railway.app | ✅ LIVE |
| 💾 Database | MongoDB Atlas | ✅ CONECTADO |

---

## 💰 PRÓXIMAS ETAPAS (OPCIONAIS)

### Se quiser um Domínio Personalizado:
1. Compre em: https://www.namecheap.com
2. Configure no Vercel: Settings → Domains
3. Custe: ~$8/ano

### Se Rails fica lento:
1. Pague $5/mês pelo "Hobby Plan"
2. Seu backend vai rodar 24/7 sem parar

### Se quiser mais recursos:
- Vercel Pro: $20/mês
- Railway Hobby: $5/mês

---

## 🆘 PROBLEMAS COMUNS

### "Erro CORS"
- Verifique se a `VITE_API_BASE` está configurada corretamente no Vercel
- Deve ser a URL do Railway, não localhost!

### "Página em branco"
- Abra DevTools (F12)
- Veja a aba "Console" para erros
- Verifique se o build foi bem-sucedido

### "API respondendo errado"
- Acesse: `https://codelink-production-xxxx.railway.app/api/health`
- Se der erro, verifique as variáveis no Railway

### "Link não redireciona"
- Verifique se o `BASE_URL` no Railway está preenchido: `https://codelink-production-xxxx.railway.app`

---

## 📞 PRECISA DE AJUDA?

1. Verifique este arquivo novamente
2. Abra a aba "Deployments" do Railway/Vercel
3. Veja os logs de erro
4. Me avise qual é o problema!

---

## ✨ PARABÉNS! 🎉

Seu site CodeLink está disponível 24/7 na internet! 

Você conseguiu publicar um projeto full-stack (frontend React + backend Node.js + banco de dados MongoDB) na nuvem!

**🚀 Próximo passo: Domínio personalizado e monetização!**
