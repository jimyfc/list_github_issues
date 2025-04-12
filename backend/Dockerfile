FROM node:22

WORKDIR /usr/src/app

# Instalamos dependencias del sistema necesarias
RUN apt-get update && \
    apt-get install -y python3 make g++ gcc

COPY package.json ./

# Instalamos dependencias de npm incluyendo las opcionales
RUN npm install --legacy-peer-deps --omit=optional && \
    npm i @swc/core@latest --platform=linux --arch=x64

COPY . .


RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "dev"]
