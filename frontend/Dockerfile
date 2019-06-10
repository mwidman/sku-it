FROM node:10.16.0-alpine

RUN mkdir /code
WORKDIR /code/
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["ng", "serve"]
