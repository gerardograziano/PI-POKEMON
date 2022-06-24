require('dotenv').config();
const {  getAllPokemons, 
         getPokemonApiById, getPokemonDbById, 
         getPokemonApiByName, getPokemonsDbByName} = require("../utils/utils");
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Sequelize } = require('sequelize');
const {Pokemons, Types} = require('../db.js');






router.get('/', async (req, res, next) => {

    try {       
        const {name} = req.query;
        if (name){
            // -------------------------------- consultar por name           
            // busqueda en la API externa
            let pokemonSearch = await getPokemonApiByName(name);

            // busqueda en la base de datos
            if (pokemonSearch.error){ // no encontrado en la API externa
                pokemonSearch = await getPokemonsDbByName(name); 

                if (!pokemonSearch){
                    return res.status(404).json({"message": "Pokemon not found"});
                }
            }
            return res.status(200).json(pokemonSearch);
        }

        // ------------------------------------- retornar todos los pokemon
        const allPokemons = await getAllPokemons(); 
        return res.status(200).json(allPokemons);
    } catch (error) {
        next(error);
    }
});




router.get('/:idPokemon', async (req, res, next) => {
    
    try {       
        const {idPokemon} = req.params;

        if (idPokemon){
            // -------------------------------- consultar por name
            // si idPokemon es numero buscar en api externa
            let pokemonSearch = null;

            if (isNaN(idPokemon)){
                pokemonSearch = await getPokemonDbById(idPokemon);
                // busqueda en la BD
            } else {
                pokemonSearch = await getPokemonApiById(idPokemon);
                // busqueda en la API externa
            }

            // busqueda en la base de datos
            if (pokemonSearch){ // no encontrado en la API externa
                return res.status(200).json(pokemonSearch);
            }
            
        }

        return res.status(404).json({"message": "Pokemon Id not found"});
    } catch (error) {
        next(error);
    }



});



router.post('/', async (req, res, next) => {
  
    const {name, image, hp, attack, defense, speed, height, weigth, types} = req.body;
    
    if (!name || !image) {
        return res.status(404).json({error : 'Name and image are requerid fields.'});
    }


    const findPokemon = await Pokemons.findAll({
        where: Sequelize.where(
            Sequelize.fn('lower', Sequelize.col('name')), 
            Sequelize.fn('lower', name)
          )
      });
 
      //Verificar que el nombre este disponible.
      if (findPokemon.length > 0) {
        return res.status(400).json({ error: "Pokemon name already existing." });}
    
    try {
        const newPokemon = await Pokemons.create(req.body);

        if (newPokemon && types && Array.isArray(types))
        {
            const promisesTypes = types.map(async (t) => {
                let type = await Types.findAll({
                    where: { name: t.name}
                    });
                
                return newPokemon.setTypes(type); //la asociacion la realiza como objeto
                });  

            await Promise.all(promisesTypes); 
        } // end-if 

        let resultPokemon = await Pokemons.findAll({
            where:{ 
                name: name
             },
            include: [Types]
            });

        //  --------- aca agrego la relacion con Types
        return res.status(201).json(resultPokemon[0]); // pokemon creado
    }
    catch (error) {
        next(error);
    }
    
});


module.exports = router;
