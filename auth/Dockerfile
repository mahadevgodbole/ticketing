FROM node:alpine

# working directory in docker image
WORKDIR /app

COPY package.json .

RUN npm install --only=prod

# cop
COPY . .

CMD ["npm","start"]
