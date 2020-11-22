const express = require('express');

const app = express();

const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { createUsuario } = require('../managers/Usuario');

//generalmente para crear
app.post('/usuario', function(req, res) {

    //el body se obtiene del middle bodyParser
    let body = req.body;

    if (!body.nombre || !body.email || !body.password || !body.role) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se han enviado los parametros correctos'
            }
        });
    }

    let usuario = {
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    };

    createUsuario(usuario).then((result) => {
        res.json({
            ok: true,
            result
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        })
    });

});







module.exports = app;