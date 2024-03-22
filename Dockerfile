# Use Node.js base image
FROM node:16-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 4000


CMD ["npm", "start"]
