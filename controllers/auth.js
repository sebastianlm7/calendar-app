const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');





const crearUsuario = async(req,res = response) => { //req: lo que solicita el usuario, res: lo que respondemos
    
    const {email, password} = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        usuario = new Usuario( req.body ); //creo un nuevo usuario en la base de dato con la info de la request

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync( );
        usuario.password = bcrypt.hashSync( password, salt ); 




        await usuario.save(); //guardo en la base de datos

        //Generar JWT

        const token = await generarJWT(usuario.id, usuario.name );




   
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msh: 'Por favor hable con el administrador'
        })
    }

    
 }

 const loginUsuario = async(req,res = response) => { 
    
    const {email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })
        }

        //Confirmar los passwords

        const validPassword = bcrypt.compareSync( password, usuario.password )

        if ( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msh: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT

        const token = await generarJWT(usuario.id, usuario.name );


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msh: 'Por favor hable con el administrador'
        })
        
    }

    
 }

 const revalidarToken = async(req, res = response) => { 
    
    const uid = req.uid;
    const name = req.name;

    // generar un nuevo JWT y retornarlo en esta petición

    const token = await generarJWT(uid, name );


    res.json({
            
            ok: true,
            uid,
            name,
            token,

        
        })
    
 }

 module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,


}