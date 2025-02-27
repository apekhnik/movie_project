FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma # Укажем путь явно
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
