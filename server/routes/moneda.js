const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getCoin, getCoins, calculateValues, updateTasa } = require('../managers/Coins');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const coins = ['bitcoin', 'dash', 'ethereum', 'ptr', 'bs', 'Euro'];

app.get('/getCoin', [verificaToken], (req, res) => {
    let body = req.body;
    getCoin(body.coin).then(respuesta => {

        const coins = respuesta;
        res.json({
            ok: true,
            coins
        });

    }).catch(err => {
        res.status(400).json({
            ok: false,
            err

        });
    });

});
app.get('/getCoins', verificaToken, (req, res) => {

    getCoins(coins).then(respuesta => {

        const coins = respuesta;
        res.json({
            ok: true,
            coins
        });

    }).catch(err => {
        res.status(400).json({
            ok: false,
            err: {
                message: err.message
            }
        });
    });

});

app.get('/getValue', verificaToken, (req, res) => {
    let body = req.body;
    if (!body.coin || !body.amount)
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se han enviado los parametros correctos'
            }
        });

    calculateValues(body.coin, body.amount, coins).then(respuesta => {
        res.json({
            ok: true,
            coins: respuesta
        });

    }).catch(err => {
        res.status(400).json({
            ok: false,
            err: {
                message: err.message
            }
        });
    });

});

app.put('/updateTasa', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    if (!body.coin || !body.value)
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se han enviado los parametros correctos'
            }
        });

    updateTasa(body.coin, body.value).then((result) => {
        return res.json({
            ok: true,
            coins: result
        });
    }).catch((err) => {

        return res.status(400).json({
            ok: false,
            err: {
                message: err
            }
        });
    });
});




module.exports = app;