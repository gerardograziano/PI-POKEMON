const { Router } = require('express');
const pokemonsRoute = require('./pokemons.js');
const typesRoute = require('./types.js');


const router = Router();

router.use('/pokemons', pokemonsRoute); //  /api/pokemons/
router.use('/types', typesRoute);   //   /api/types/


module.exports = router;
