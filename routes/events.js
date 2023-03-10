/*
    Event Routes
    host + api/events
*/

const {Router} = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas tienen que pasar por la validacion del JWT 
router.use( validarJWT ); // cualquier peticion abajo de esto va a tener que tener su token 


// Obtener eventos 
router.get('/', getEventos );

// Crear evento
router.post('/',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(  isDate ),
    check('end','Fecha de fin es obligatoria').custom(  isDate ),
    validarCampos,
]
, crearEvento );

// Actualizar eventos 
router.put('/:id', 
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(  isDate ),
    check('end','Fecha de fin es obligatoria').custom(  isDate ),
    validarCampos,
] ,actualizarEvento );

//Borrar evento
router.delete('/:id', borrarEvento );

module.exports = router; 