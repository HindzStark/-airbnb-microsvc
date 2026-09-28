FROM node:18-slim

WORKDIR /app

COPY package*.json  .

run npm install

COPY src ./src

EXPOSE 3001

CMD ["npm","start"]