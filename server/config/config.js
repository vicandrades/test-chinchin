//===============================================
//PUERTO
//heroku actualiza la variable del puerto si ella es null es porque esta corriendo en un ambiente local y por eso enviamos el puerto 3000
//===============================================
process.env.PORT = process.env.PORT || 3000;

//===============================================
//VENCIMIENTO DEL TOKEN
//===============================================
process.env.CADUCIDAD_TOKEN = '48h';


//===============================================
//SEED DE AUTENTICACION 
//===============================================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//===============================================
//BASE DE DATOS
//===============================================
process.env.USERDB = 'postgres';
process.env.PASSWORDDB = '1234';
process.env.DATABASE = 'chinchin';
process.env.HOSTDB = 'localhost';
process.env.PORTDB = '5432';