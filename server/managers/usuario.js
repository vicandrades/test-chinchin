let { createUsuario: RepositoryCreateUsuario, getUsuario: RepositoryGetUsuario } = require('../repository/usuarioRepository')

const createUsuario = (usuario) => {

    return new Promise((resolve, reject) => {
        RepositoryCreateUsuario(usuario, (err, usuario) => {
            if (err) {
                reject({
                    err
                });
            } else {
                resolve({
                    usuario
                });
            }
        });
    });
}

const getUsuario = (usuario) => {

    return new Promise((resolve, reject) => {
        RepositoryGetUsuario(usuario, (err, usuario) => {
            if (err) {
                reject(
                    err
                );
            } else {
                resolve(
                    usuario
                );
            }
        });
    });
}


module.exports = {
    createUsuario,
    getUsuario
}