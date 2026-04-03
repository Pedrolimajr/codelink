FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o build)
COPY package*.json ./

# Instala as dependências de produção
RUN npm install --omit=dev

# Copia o restante dos arquivos do backend
COPY . .

EXPOSE 5000

CMD ["npm", "start"]