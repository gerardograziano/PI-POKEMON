const axios = require('axios');
const { Pokemons, Types } = require('../db');
const { Sequelize } = require('sequelize');
const {URL_API_POKEMON, AMOUNT_POKEMONS} = process.env;



async function getPokemonsApi() 
{
    let arrayPokemonsApi = [];

      // carga de pokeAPI -----------------------------------------
    await axios.get(`${URL_API_POKEMON}?limit=${AMOUNT_POKEMONS}`)
      .then(async (response) => {
          let arrayResultApi = response.data.results;
          let arrayPromises = [];
          arrayResultApi.map((p) => arrayPromises.push(axios.get(p.url)));
        
          await Promise.all(arrayPromises)
          .then((pokemons) => {
              arrayPokemonsApi = pokemons.map((p) => {
                  return {
                      id: p.data.id,
                      name: p.data.name,
                      image: p.data.sprites.other.dream_world.front_default,  // url imagen
                      hp: p.data.stats[0].base_stat,
                      attack: p.data.stats[1].base_stat,
                      defense: p.data.stats[2].base_stat,
                      speed: p.data.stats[3].base_stat,
                      height: p.data.height,
                      weight: p.data.weight,
                      types: p.data.types.map((t) => {
                          return {
                              name: t.type.name
                          }
                      })
                  };  // return 
              }); // map
          }) 
          .catch((error) => {
              return error;
          });

      })
      .catch((error) => {
          return error;
      });
        // ------------------------------- end - carga de poke API
    return arrayPokemonsApi;
};


async function getPokemonsDb() 
{
    try{
        const arrayPokemonsDb = await Pokemons.findAll({
            include:{
                attributes: ["name"],
                model: Types,
                through: {
                attributes: [],
                },
            }
        });

        return arrayPokemonsDb;
    } catch(error){
        return error;
    }
    // ------------------------------- end - carga de poke DB
}



async function getAllPokemons() {
    try {
      let apiPokemons = await getPokemonsApi();
      let dbPokemons = await getPokemonsDb(); 
      return apiPokemons.concat(dbPokemons);
    } catch (error) {
      return error;
    }
  };


async function getPokemonApiById(idSearch) {
    try{
        const searchPokemonsApi = await axios.get(`${URL_API_POKEMON}/${idSearch}`);

        if (searchPokemonsApi) {
           
            let p = searchPokemonsApi;

            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,  // url imagen
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => { return {name: t.type.name}})
            };  // return

        }else {
            return null;
        }
    } catch(error){
        return null;
    }

}


async function getPokemonDbById(idSearch) {
    try{
        const searchPokemon = await Pokemons.findOne({
            where: {
                id: idSearch
            },
            include:{
                attributes: ["name"],
                model: Types,
                through: {
                attributes: [],
                },
            }
        });

        return searchPokemon;
    } catch(error){
        return null;
    }
}



async function getPokemonApiByName(nameSearch) {
    try{
        const searchPokemonsApi = await axios.get(`${URL_API_POKEMON}/${nameSearch}`);

        if (searchPokemonsApi) {

            let p = searchPokemonsApi;
            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,  // url imagen
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => { return {name: t.type.name}})
            };  // return

        }else {
            return null;
        }
    } catch(error){
        return ({error : "no encontrado"});
    }
}


async function getPokemonsDbByName(nameSearch){ 

    try{
        const searchPokemon = await Pokemons.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('pokemons.name')), 
                Sequelize.fn('lower', nameSearch)
              ),

            include:{
                attributes: ["name"],
                model: Types,
                through: {
                attributes: [],
                },
            }
        });

        return searchPokemon;
    } catch(error){
        return error;
    }
}


module.exports ={
        getAllPokemons,
        getPokemonsDb,
        getPokemonApiById,
        getPokemonDbById,
        getPokemonApiByName,
        getPokemonsDbByName
    };