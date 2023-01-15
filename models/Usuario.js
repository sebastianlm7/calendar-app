
const { Schema, model } = require('mongoose'); 

const UsuarioSchema = Schema({ //Schema es la la forma que va tener info que voy a guardar en la base de datos

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UsuarioSchema);