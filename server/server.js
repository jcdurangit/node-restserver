require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //Solo se dispara cuando pase por ahi el c'odigo

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Get Usuario');
})


app.post('/usuario', function(req, res) {

    let body = req.body;
    if (body.nombre === undefined) {

        res.status(400).json({

            ok: false,
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id; // El primer id solo es una variable el segundo es el id de /usuario/id
    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('Delete Usuario');
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto 3000');
});