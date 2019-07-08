//PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Si esa variable no existe se supondrá que estoy en desarrollo

//==========================
//Vencimiento del Token
//==========================
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//==========================
// SEED de autenticación
//==========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//==========================
//BASE DE DATOS
//==========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//==========================
//GOOGLE CLIENTE ID
//==========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '922267788321-fm6m6j19ekjt8gurjcabh9ddtol7injc.apps.googleusercontent.com';