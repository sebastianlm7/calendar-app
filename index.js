
const express = require('express'); //esto es como hacer una importanción, pero para node
const dbConnection = require('./database/config');
const cors = require('cors');
require('dotenv').config();



// Crear el servidor de express

const app = express(); 

// Base de datos
dbConnection(); 

// CORS

app.use(cors())


// Directorio Publico
app.use(express.static('public') ) //el use en express es un middleware (funcion que se ejecuta cuando alguien hace petición al servidor)

// Lectura y parseo del body 

app.use( express.json( )); //voy a procesar acá las peticiones que vengan con formato json


//Rutas
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/events', require('./routes/events')); 

app.get('*', (req, res)=> { //comodin de las rutas por si no es ni la publica ni las dos que estan Rutas
    res.sendFile(__dirname + '/public/index.html')
})



//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT}`);
});