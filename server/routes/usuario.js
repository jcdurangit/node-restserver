const express = require('express');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'duro2345';
/*const someOtherPlaintextPassword = 'not_bacon';*/

const _ = require('underscore');

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});


const Usuario = require('../models/usuario');
const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion')

const app = express();

//SE CREARA UN MIDDLEWARES SE COLOCA COMO UN SEGUNDO ARGUMENTO EN LOS SERVICIOS GET..USANDO LO QUE ES ES EXPREES

app.get('/usuario', verificarToken, (req, res) => {
    //res.json('Get Usuario');
    //skip salta la cantidad en relación a los primeros registros

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(5)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Cuantos registros tenemos 
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });

            });
        });

});
app.post('/usuario', [verificarToken, verificarAdminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        role: body.role
    })


    //GRABAR EN BASE DE DATOS

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /*  if (body.nombre === undefined) {

          res.status(400).json({

              ok: false,
              mensaje: 'El nombre es necesario'
          });
      } else {
          res.json({
              persona: body
          });
      }*/

})

app.put('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

    let id = req.params.id; // El primer id solo es una variable el segundo es el id de /usuario/id

    //let body = req.body;

    //usando el underscore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req, res) => {

    //Eliminación de usuarios

    let id = req.params.id;

    //ELIMINAR DE LA BASE DE DATOS

    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

         if (err) {
             return res.status(400).json({
                 ok: false,
                 err
             });
         }

         if (!usuarioBorrado) {
             return res.status(400).json({

                 ok: false,
                 err: {
                     message: 'Usuario no encontrado'
                 }
             });
         }
         res.json({
             ok: true,
             usuario: usuarioBorrado
         });
     });*/


    // SE MODIFICARA EL ESTADO A FALSO

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioActualizado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioActualizado) {
            return res.status(400).json({

                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    });
});

module.exports = app;