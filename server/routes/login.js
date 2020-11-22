const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUsuario } = require('../managers/Usuario');

app.post('/login', (req, res) => {

    let body = req.body;

    if (!body.email || !body.password) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se han enviado los parametros correctos'
            }
        });
    }

    let usuario = {
        email: body.email,
        password: body.password
    }

    getUsuario(usuario).then((usuarioDB) => {
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o password incorrectos'
                }
            })
        }
        console.log(usuarioDB);
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o password incorrectos'
                }
            })
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err: {
                message: err.message
            }
        })
    });


});







module.exports = app;