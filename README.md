# Indice

* [Que es](#que-es)
* [Tecnologias usadas](#tecnologias-usadas)
* [Como funciona](#como-funciona)
* [Iniciar el proyecto](#iniciar-el-proyecto)

# Que es
Este proyecto es una aplicación web desarrollada con Angular y Strapi. Su objetivo es listar problemas de GitHub de forma eficiente y visualmente atractiva. La aplicación utiliza Angular en el frontend para una interfaz de usuario interactiva y Strapi para manejar el backend, proporcionando un sistema de gestión de contenido robusto.

# Tecnologias usadas

* Angular 19.2.0
* Strapi 5.12.0
* Node.js 20 para el frontend y 22.14 para el backend
* Vite para el frontend
* PostgreSQL 17.4 

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
