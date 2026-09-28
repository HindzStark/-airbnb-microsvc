FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src ./src

EXPOSE 3002

CMD ["npm","start"]