const { Router } = require('express');
// Importar todos los routers;
const controller = require('../controller/index')


const router = Router();

// Configurar los routers
router.get('/dogs/:idRaza', controller.getDogById)
router.get('/dogs', controller.getDogs)
router.post('/dogs', controller.addDog)
router.get('/temperaments', controller.getTemperament)
module.exports = router;
