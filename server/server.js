require('./config/config');
const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //Solo se dispara cuando pase por ahi el c'odigo

// parse application/json
app.use(bodyParser.json())

//CONFIGURACIÓN GLOBAL DE RUTAS
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto 3000');
});