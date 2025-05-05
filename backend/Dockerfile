FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
