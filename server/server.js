require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/**************** bodyparser se usa para obtener el body de las peticiones */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Configuracion Global de rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto:`, process.env.PORT);
});