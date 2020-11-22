const { Client } = require('pg');

const client = new Client({
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.DATABASE,
    password: process.env.PASSWORDDB,
    port: process.env.PORTDB,
})

client.connect().then((result) => {
    console.log('base de datos Online');
}).catch((err) => {
    console.log('No se pudo conectar a la bd' + err);
});


module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback)
    },
}