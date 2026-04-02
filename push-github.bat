@echo off
REM Script para fazer upload para GitHub (Windows)

echo.
echo 🚀 Preparando para fazer upload para GitHub...
echo.

setlocal enabledelayedexpansion

REM Solicitar dados
set /p GITHUB_USER="Entre com seu usuário do GitHub: "
set /p REPO_NAME="Entre com o nome do repositório (ex: codelink): "

set REPO_URL=https://github.com/!GITHUB_USER!/!REPO_NAME!.git

echo.
echo 📦 Iniciando processo de upload...
echo.

REM Inicializar git se necessário
if not exist ".git" (
    echo ➜ Inicializando repositório git...
    call git init
)

REM Adicionar todos os arquivos
echo ➜ Adicionando arquivos...
call git add .

REM Fazer commit
echo ➜ Fazendo commit...
call git commit -m "Initial commit: CodeLink - URL Shortener"

REM Adicionar remote
echo ➜ Adicionando repositório remoto...
call git remote add origin "!REPO_URL!" 2>nul || call git remote set-url origin "!REPO_URL!"

REM Renomear branch
echo ➜ Renomeando branch para main...
call git branch -M main

REM Fazer push
echo ➜ Fazendo push para GitHub...
call git push -u origin main

echo.
echo ✅ Upload concluído!
echo 🔗 Repositório: !REPO_URL!
echo.
echo 👉 Próximo passo: Deploy no Railway e Vercel
echo 📖 Veja: DEPLOY_SIMPLES.md
echo.
pause
