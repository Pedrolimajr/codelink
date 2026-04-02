@echo off
REM Script para iniciar CodeLink em ambiente de desenvolvimento (Windows)

echo.
echo 🚀 Iniciando CodeLink...
echo.

REM Iniciar Backend em uma nova janela
echo 📝 Iniciando Backend na porta 5000...
start "CodeLink Backend" cmd /k "cd backend && npm run dev"

REM Aguardar o backend iniciar
timeout /t 3 /nobreak

REM Iniciar Frontend em uma nova janela
echo 🎨 Iniciando Frontend na porta 5173...
start "CodeLink Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ CodeLink está rodando!
echo 🌐 Frontend: http://localhost:5173
echo 📡 Backend API: http://localhost:5000
echo 📊 Health Check: http://localhost:5000/api/health
echo.
