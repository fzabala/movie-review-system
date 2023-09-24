FROM node:16

WORKDIR /app

COPY tsconfig.json .
COPY .sequelizerc .
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN npx sequelize db:migrate

EXPOSE 4000

CMD ["npm", "run dev"]
