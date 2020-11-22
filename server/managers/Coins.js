const axios = require('axios');
let { obtenerMonedaStatic, updateTasa: repositoryUpdateTasa } = require('../repository/monedaRepository')

const getCoin = async(coin) => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const resp = await axios.get(url);

    if (!resp.data[0] || resp.status != 200) {

        return await getCoinAlternative(coin);

        //throw new Error(`Ha ocurrido un error consultando la moneda ${coin}`);
    }

    return resp.data[0];
}

const getCoins = async(coins) => {

    let resCoins = [];

    for (coin of coins) {
        const resp = await getCoin(coin);
        if (resp)
            resCoins.push(resp);
    }

    return resCoins;
}

const calculateValues = async(coin, amount, coins) => {

    let respData = [];
    const resp = await getCoin(coin);

    let currentpriceUsd = resp.current_price;
    let priceByAmount = currentpriceUsd * amount;


    const respCoins = await getCoins(coins);


    for (respCoin of respCoins) {

        let data = {
            id: respCoin.id,
            symbol: respCoin.symbol,
            name: respCoin.name,
            price: priceByAmount / respCoin.current_price
        }

        respData.push(data);
    }

    return respData;
}


const getCoinAlternative = (coin) => {

    return new Promise((resolve, reject) => {
        obtenerMonedaStatic(coin, function(err, monedaDB) {
            if (err) {
                reject({
                    id: coin,
                    message: err
                });
            } else {
                resolve({
                    id: coin,
                    current_price: monedaDB.tasa
                });
            }
        });
    });
}

const updateTasa = (coin, value) => {

    return new Promise((resolve, reject) => {
        repositoryUpdateTasa(coin, value, (err, message) => {
            if (err) {
                reject({
                    id: coin,
                    message: err //'no se ha podido actualizar el coin: ' + coin
                });
            } else {
                resolve({
                    id: coin,
                    message: 'se ha actualizado el coin: ' + coin
                });
            }
        });
    });
}


module.exports = {
    getCoin,
    getCoins,
    calculateValues,
    updateTasa
}