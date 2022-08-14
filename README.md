<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Pokemon

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


## Descripción

Es una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons


#### Tecnologías utilizadas:
- React
- Redux
- Express
- Sequelize - Postgres
- CSS puro, CSS Modules


#### Frontend

Se desarrollo una aplicación de React/Redux que contiene:

__Pagina inicial__

__Ruta principal__ 
- [ ] Input de búsqueda para encontrar pokemons por nombre (búsqueda es exacta)
- [ ] Listado de pokemons. se muestra su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
  
- [ ] Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.

__Ruta de detalle de Pokemon__
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__:
- [ ] Un formulario __controlado con JavaScript__ 
- [ ] Posibilidad de seleccionar/agregar más de un tipo de Pokemon
- [ ] Botón/Opción para crear un nuevo Pokemon

> El formulario de creación está validado con JavaScript.


#### Backend

Se desarrollo un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Obtiene un listado de los pokemons desde pokeapi.

- [ ] __GET /pokemons/{idPokemon}__:
  - Obtiene el detalle de un pokemon en particular

- [ ] __GET /pokemons?name="..."__:
  - Obtiene el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos

- [ ] __GET /types__:
  - Obtiene todos los tipos de pokemons posibles
 
 
 
