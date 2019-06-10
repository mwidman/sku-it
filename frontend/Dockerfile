FROM node:10.16.0-alpine

RUN mkdir /code
WORKDIR /code/
RUN npm i -g typescript @angular/cli
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD ["ng", "serve"]
