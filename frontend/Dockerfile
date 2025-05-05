# --------Build Stage--------
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
