FROM node:20-slim

WORKDIR /usr/src/app

# Instalamos dependencias necesarias
# RUN apt-get update && apt-get install -y python3 make g++

# Copiamos package.json
COPY package*.json ./

# Limpiamos caché e instalamos dependencias
# RUN npm cache clean --force
RUN npm install --legacy-peer-deps --omit=optional --platform=linux --arch=arm64

# Copiamos el resto del proyecto
COPY . .

RUN npm rebuild @angular-devkit/build-angular --force
RUN npm install @rollup/rollup-linux-arm64-gnu --platform=linux --arch=arm64

EXPOSE 4200

CMD ["npx", "nx", "serve", "web", "--host", "0.0.0.0"]