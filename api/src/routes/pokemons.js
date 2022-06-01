const { Router } = require('express');

const router = Router();
const {Pokemons} = require('../db.js');



router.get('/', (req, res, next) => {

    const {name} = req.query;
    
    // router /pokemons
    if (!name) {
        return Pokemons.findAll()
        .then((pokemons) => {
            res.send(pokemons);
        });
    }


    // router para buscar por nombre
    // router /pokemons?name=pikachu
    return Pokemons.findAll()
    .then((pokemons) => {
        res.send(pokemons);
    });

});




router.get('/:idPokemon', (req, res, next) => {
    return res.send(' soy GET /pokemons/:idPokemon');
});



router.post('/', (req, res, next) => {

    res.send(' soy POST /pokemons/');
    
    // const {name, image} = req.body;
    // const newPokemon = await Pokemons.create({name, image});
    // console.log(name, image);
    // res.send(newPokemon);
});


module.exports = router;
