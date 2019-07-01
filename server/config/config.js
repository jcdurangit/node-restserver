//PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Si esa variable no existe se supondrá que estoy en desarrollo

//BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.NODE_ENV.MONGO_URI;
}
process.env.URLDB = urlDB;