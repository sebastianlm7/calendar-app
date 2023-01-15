const {response, json} = require('express');
const Evento = require('../models/Eventos');

const getEventos = async(req, res = response) => { 

    const eventos = await Evento.find() 
                                .populate('user', 'name') //esto me va a mostrar todos los datos dentro de user (solo id que viene por defecto y name)

    res.json({
        ok: true,
        msg: eventos,
    })
 }

 const crearEvento = async(req, res = response) => { 

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

    
    
 }

 const actualizarEvento = async(req, res = response) => { 

    const eventoId = req.params.id; //obtengo el id 
    const uid = req.uid 

    try {

        const evento = await Evento.findById( eventoId );

        if ( !eventoId ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            })
        } 

        if ( evento.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene el privilegio de editar este evento'
                })    

        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} ); // el new:true hace que devuelva el evento actualizado tmb

        res.json({
            ok:true,
            evento: eventoActualizado, 
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }



  
 }

 const borrarEvento = async(req, res = response) => { 


    const eventoId = req.params.id; //obtengo el id 
    const uid = req.uid 

    try {

        const evento = await Evento.findById( eventoId );

        if ( !eventoId ) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            })
        } 

        if ( evento.user.toString() !== uid ) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene el privilegio de editar este evento'
                })    

        }


        await Evento.findByIdAndDelete( eventoId ); // el new:true hace que devuelva el evento actualizado tmb

        res.json({
            ok:true,
            msg: "Evento borrado", 
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
 }

 module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
    
 }


