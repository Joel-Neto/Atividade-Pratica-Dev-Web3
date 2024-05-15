const express = require('express');
const app = express();

const {config} = require("dotenv");
config(); // Carega as variáveis do .env

const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const userRoute = require('./src/routes/userRoute'); 
const projectRoute = require('./src/routes/projectRoute'); 

// Configurar acesso à BD.
const mongoose = require('mongoose');
let url = "mongodb://127.0.0.1:27017/fatec";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar ao MongoDB'));

// Middlewares
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.urlencoded({extended: false}));
app.use(userRoute)
app.use(projectRoute)

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
});