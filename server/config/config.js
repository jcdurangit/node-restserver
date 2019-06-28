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
    urlDB = 'mongodb+srv://jcmatrix:VjMQA0xOMG0CxAhH@cluster0-swpuw.mongodb.net/test';
}
process.env.URLDB = urlDB;