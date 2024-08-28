const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const databaseRoute = require('./routes/routeDatabase');
const userRoute = require('./routes/routeUser');
const subscriptionRoute = require('./routes/routeSubscription'); 

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Autorise les requêtes depuis ce domaine
    credentials: true, // Permet d'envoyer des cookies ou des en-têtes d'authentification
}));
app.use(cookieParser());

app.use('/database', databaseRoute);
app.use('/user', userRoute);
app.use('/subscription', subscriptionRoute);

app.listen(8000, () => {
    console.log("server lancé sur port 8000");
});