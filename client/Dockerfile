FROM node:12.16.1
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8000

CMD ["yarn", "start"]