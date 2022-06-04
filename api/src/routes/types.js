
const axios = require('axios');
const { Router } = require('express');
const {Types} = require('../db');
const {
    URL_API_POKEMON_TYPES, PICTURES_TYPES_DIR,
  } = process.env; 

const router = Router();


router.get('/', async (req, res, next) => {
    try 
    {
        const typesList = await Types.findAll();
        
        if (typesList.length === 0) {
            // cargar primera vez Types de Pokemon a DB
            try{
                const response = await axios.get(URL_API_POKEMON_TYPES);
                const typesList = response.data.results.map((t) => {
                                            return {
                                            name: t.name,
                                            image: PICTURES_TYPES_DIR + t.name + '.png'}
                                            });
                await Types.bulkCreate(typesList);
                res.status(200).json(typesList);
            }
            catch(error){
                next(error);    
            }
        }
        else {
            console.log('tipos cargados de la base de datos');
            return res.status(200).json(typesList); /// returm types
        }
    } 
    catch (error)
    {
        next(error);
    }
});




module.exports = router;
