FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache postgresql-client
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build
EXPOSE 3000
CMD ["./migrate-and-start.sh"]
