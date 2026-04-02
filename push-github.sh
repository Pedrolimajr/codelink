#!/bin/bash
# Script para fazer upload para GitHub

echo "🚀 Preparando para fazer upload para GitHub..."
echo ""

# Solicitar dados
read -p "Entre com seu usuário do GitHub: " GITHUB_USER
read -p "Entre com o nome do repositório (ex: codelink): " REPO_NAME

REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"

echo ""
echo "📦 Iniciando processo de upload..."
echo ""

# Inicializar git se necessário
if [ ! -d ".git" ]; then
    echo "➜ Inicializando repositório git..."
    git init
fi

# Adicionar todos os arquivos
echo "➜ Adicionando arquivos..."
git add .

# Fazer commit
echo "➜ Fazendo commit..."
git commit -m "Initial commit: CodeLink - URL Shortener"

# Adicionar remote
echo "➜ Adicionando repositório remoto..."
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

# Renomear branch
echo "➜ Renomeando branch para main..."
git branch -M main

# Fazer push
echo "➜ Fazendo push para GitHub..."
git push -u origin main

echo ""
echo "✅ Upload concluído!"
echo "🔗 Repositório: $REPO_URL"
echo ""
echo "👉 Próximo passo: Deploy no Railway e Vercel"
echo "📖 Veja: DEPLOY_SIMPLES.md"
