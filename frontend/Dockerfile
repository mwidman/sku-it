FROM node:10.16.0-alpine

RUN mkdir /app
WORKDIR /app/
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["ng", "serve"]
