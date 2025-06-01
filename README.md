# Github Users Api - Challenge Técnico Backend (Frávega Tech)

## Descripción

API RESTfull con **NestJS** que interactúa con API pública de GitHub

- Obtener usuarios de GitHub con paginación
- Buscar usuarios por un término
- Marcar un usuario como favorito
- Obtener la lista de favoritos
- Obtener el detalle de un usuario por su 'username', con 'is_favorite'

---

## Requisitos Técnicos Cumplidos

- NestJS
- Axios puro
- DTOs con validaciones ('class-validator')
- Swagger ('@nestjs/swagger') con '@ApiOperation', '@ApiResponse', '@ApiQuery' y '@ApiParam'
- Almacenamiento en memoria para favoritos
- Manejo de errores y validaciones HTTP

---

## Setup

```bash
#Clonar repositorio
git clone https://github.com/juanicarramal/github_users.git
cd github-users

#Instalar dependencias
$ yarn install
```

## Variables de entorno

Crear un archivo .env en la raiz del proyecto con el siguiente contenido:

PORT=3000
BASE_URL=https://api.github.com


## Correr el proyecto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Correr tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Documentación Swagger

Una vez iniciado el servidor, desde un navegador ir a 
```bash
http://localhost:3000/api
```

## Endpoints disponibles 

### GET /users
Obtiene lista de usuarios publicos de GitHub
Query Params:
  - per_page (opcional): cantidad de resultados por pagina (default: 30)
  - page (opcional): numero de página (default: 1)

### GET /users/search-users
Busca usuarios por un término
Query Params:
  - term (obligatorio): término de busqueda
  - per_page (opcional): cantidad de resultados por pagina (default: 30)
  - page (opcional): numero de página (default: 1)

### GET /users/:username
Devuelve los detalles del usuario de Github, incluyendo si esta en la lista de favoritos
  - is_favorite: true | false

### POST /favorites/:username
Marca un usuario como favorito

### GET /favorites
Devuelve un array de username marcados como favoritos 


## Autor

Juan Ignacio Carramal - [linkedin.com](https://www.linkedin.com/in/juan-ignacio-carramal-5823b1136/)