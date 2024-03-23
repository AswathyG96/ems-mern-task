# Use Node.js base image
FROM node:18.15.0-alpine

RUN apk add --no-cache xdg-utils


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3000


CMD ["npm", "start"]
