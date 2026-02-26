# Use uma imagem estável do Node
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package*.json ./
# O Kottster precisa de devDependencies para o build
RUN pnpm i 

# Copia o resto dos arquivos
COPY . .

# Executa o build do Kottster (gera a pasta dist)
RUN pnpm build

# --- Estágio de Produção ---
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
# Instala apenas o necessário para rodar
RUN pnpm i --omit=dev

# Copia os arquivos compilados do estágio anterior
COPY --from=builder /app/dist ./dist
# O Kottster armazena configs em arquivos JSON e SQLite por padrão
COPY --from=builder /app/src/generated ./src/generated

ENV NODE_ENV=production
ENV PORT=5480
EXPOSE 5480

# Comando para iniciar
CMD ["node", "dist/server/server.cjs"]