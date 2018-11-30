FROM node:8

WORKDIR /usr/src/app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9005
# CMD [ "npm", "run", "server-dev" ]
# CMD [ "npm", "run", "start-pm2" ]
CMD ["pm2-runtime", "server/index.js"]