const jwt = require('jsonwebtoken');

//====================
// Verificar Token
//======================
//3 argumentos, req solicitud, res la respuesta que deseo retornar, next este continuara con la ejecución del programa
let verificarToken = (req, res, next) => {

    //leer headers de la página
    let token = req.get('token'); //el nombre del header que busco se llama token

    //Validar el token
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({

                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });




};

//====================
// Verificar AdminRole
//======================

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {

        next();

    } else {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });

    }
};

module.exports = {
    verificarToken,
    verificarAdminRole
}