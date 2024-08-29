const express = require('express');
const cors = require('cors');
require('dotenv').config();
const databaseRoute = require('./routes/routeDatabase');
const fileRoute = require('./routes/routeFiles');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/database', databaseRoute);
app.use('/files', fileRoute);

app.listen(8000, () => {
    console.log("server lancé sur port 8000");
});