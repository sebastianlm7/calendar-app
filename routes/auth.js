/*
    Rutas de Usuarios / Auth
    host + api/auth 
*/

const express = require('express');
const { check } = require('express-validator') // el check es el middleware que valida un campo en particular
const router = express.Router();


const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El pw debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ] , 
    crearUsuario 
); 

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El pw debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario 
);

router.get('/renew', validarJWT, revalidarToken );

 
 
 
 module.exports = router; 