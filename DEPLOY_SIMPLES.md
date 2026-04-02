# 🎯 RESUMO RÁPIDO - 3 PASSOS PARA PUBLICAR

## 📋 O que você precisa ter

- [ ] Conta GitHub (grátis em github.com)
- [ ] Conta Vercel (grátis em vercel.com)
- [ ] Conta Railway (grátis em railway.app)

---

## ⚡ RESUMO DOS 3 PASSOS

### ✅ PASSO 1: GitHub (5 min)
```powershell
cd C:\Junior\PixelCodeIA
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU_USUARIO/codelink.git
git branch -M main
git push -u origin main
```
**✓ Seu código está no GitHub!**

### ✅ PASSO 2: Railway - Backend (10 min)
1. railway.app → New Project → Deploy from GitHub → Selecione codelink
2. Variables: Adicione as 5 credenciais (MONGO_URI, JWT_PRIVATE_KEY, PORT, NODE_ENV, BASE_URL)
3. Copie a URL que aparecer (tipo: `https://codelink-api.railway.app`)

**✓ Seu backend está rodando!**

### ✅ PASSO 3: Vercel - Frontend (10 min)
1. vercel.com → New Project → Selecione codelink
2. Root Directory: `frontend`
3. Environment Variables:
   - `VITE_API_BASE` = URL do Railway que você copiou
   - `VITE_APP_NAME` = CodeLink
4. Deploy

**✓ Seu site está ao vivo!**

---

## 🔗 URLs FINAIS
- Frontend: `https://codelink.vercel.app`
- Backend: `https://codelink-api.railway.app`
- API Health: `https://codelink-api.railway.app/api/health`

---

## 💡 DICA IMPORTANTE

Depois do primeiro deploy:
1. Se Railway ficar lento → Pague $5/mês pelo Hobby Plan
2. Se quiser domínio próprio → Compre em namecheap.com e configure no Vercel

**SEU SITE ESTARÁ ACESSÍVEL 24/7 MESMO COM SUA MÁQUINA DESLIGADA!** 🎉

---

## 📖 GUIA COMPLETO
Se precisar de mais detalhes, veja o arquivo: **DEPLOY_VERCEL_RAILWAY.md**
