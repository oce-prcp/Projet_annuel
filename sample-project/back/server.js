const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


app.listen(8000, () => {
    console.log("server lancé sur port 8000");
});