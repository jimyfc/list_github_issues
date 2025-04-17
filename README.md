# Indice

* [Que es](#que-es)
* [Tecnologias usadas](#tecnologias-usadas)
* [Prerequisitos](#prerequisitos)
* [Como funciona](#como-funciona)
* [Iniciar el proyecto](#iniciar-el-proyecto)
* [Notas](#notas)

# Que es
Este proyecto es una aplicación web desarrollada con Angular y Strapi. Su objetivo es listar problemas de GitHub de forma eficiente y visualmente atractiva. La aplicación utiliza Angular en el frontend para una interfaz de usuario interactiva y Strapi para manejar el backend, proporcionando un sistema de gestión de contenido robusto.

# Tecnologias usadas

* Angular 19.2.0
* Strapi 5.12.0
* Node.js 20 para el frontend y 22.14 para el backend
* Vite para el frontend
* PostgreSQL 17.4 

# Prerequisitos

Debe de tener instalado y configurado correctamente los siguientes programas:
* Docker
* Docker Compose 

# Como funciona

1. El proyecto se compone de dos partes: el frontend y el backend.

2. El frontend utiliza Angular para construir una interfaz de usuario interactiva y Strapi para manejar el backend, proporcionando un sistema de gestión de contenido robusto.

3. El backend utiliza Strapi para proporcionar una base de datos y un sistema de gestión de contenido robusto.

# Iniciar el proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/jimyfc/list_github_issues.git
```

2. Acceder al directorio del proyecto (Ejeuctar este comando solo si es la primera vez que se arranca el proyecto):
```bash
docker-compose -f docker-compose.yml build
```

3. Iniciar el proyecto:
```bash
docker-compose -f docker-compose.yml up
```

4. Acceder a la URL: [http://localhost:4200/](http://localhost:4200/) 

5. Ejecución de tests
```bash
  npx nx test auth
  npx nx test auth
  npx nx test issues
  npx nx test util
  npx nx test issues
  npx nx test shared
```

# Notas
- En ocaciones se debe de repetir el paso 3 un par de veces porque el frontend no arranca, he tenido varios problemas por el tema de que mi procesador es M2 
- Cuando se registra al usuario admin en Stripe hay problemas de conexión con su API de Analytics y no deja completar el último paso cuando se debe de seleccionar el rol. Ir a la URL Principal e iniciar sesión con normalidad
- Los archivos `.env` con las variables de entorno, normalmente se ignoran, pero como no hay ninguna inforación delicada y para facilitar el despliegue se incluyen en el repositorio