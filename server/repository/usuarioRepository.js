const db = require('../postgresql/postgresql');

function createUsuario(usuario, callback) {
    db.query('insert into usuario (nombre,email,password,role) values ($1,$2,$3,$4) RETURNING *', [usuario.nombre, usuario.email, usuario.password, usuario.role], (err, res) => {
        if (err) {
            callback(`error insertando la data ${err}`);
        } else {
            callback(null, res.rows[0]);
        }


    })
}

function getUsuario(usuario, callback) {
    db.query('select * from usuario where email=$1', [usuario.email], (err, res) => {
        if (err) {
            callback(`error consultando data la data ${err}`);
        } else {
            callback(null, res.rows[0]);
        }

    })
}

module.exports = {
    createUsuario,
    getUsuario
}