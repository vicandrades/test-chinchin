// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../postgresql/postgresql');

function obtenerMonedaStatic(coin, callback) {
    db.query('SELECT * FROM moneda WHERE nombre = $1', [coin], (err, res) => {
        if (err || res.rowCount <= 0) {
            callback(`no existe la moneda ${coin} en base de datos`);
        } else {
            callback(null, res.rows[0]);
        }
    })
}

function updateTasa(coin, value, callback) {
    db.query('Update moneda set tasa = $1 where nombre=$2', [value, coin], (err, res) => {
        if (err) {
            callback(`no existe la moneda ${coin} en base de datos`);
        } else {
            callback(null, 'Registro actualizado');
        }


    })
}

module.exports = {
    obtenerMonedaStatic,
    updateTasa
}