const { Router } = require('express');

const router = Router();


router.get('/', (req, res, next) => {
    res.send(' soy GET /type');
});


module.exports = router;
