#!/bin/bash

# Script para iniciar CodeLink em ambiente de desenvolvimento

echo "🚀 Iniciando CodeLink..."
echo ""

# Terminal 1: Backend
echo "📝 Iniciando Backend na porta 5000..."
cd backend
npm run dev &
BACKEND_PID=$!

# Aguardar o backend iniciar
sleep 3

# Terminal 2: Frontend  
echo "🎨 Iniciando Frontend na porta 5173..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ CodeLink está rodando!"
echo "🌐 Frontend: http://localhost:5173"
echo "📡 Backend API: http://localhost:5000"
echo "📊 Health Check: http://localhost:5000/api/health"
echo ""
echo "Pressione Ctrl+C para parar os servidores"

# Aguardar sinais de término
wait
