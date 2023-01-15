

const { Schema, model } = require('mongoose'); 

const EventoSchema = Schema({ //Schema es la la forma que va tener info que voy a guardar en la base de datos

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function() { //esto modifica la visualizacion, no la base de datos
    const { __v, _id, ...object} = this.toObject(); //extraigo las probs __v y _id y despues cambio el nombre de _id a id, el __v no lo muestro
    object.id =_id; 
    return object; 
})

module.exports = model('Evento', EventoSchema);