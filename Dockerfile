FROM node:18

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf ./src

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]