const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const databaseRoute = require('./routes/routeDatabase');
const fileRoute = require('./routes/routeFiles');
const userRoute = require('./routes/routeUser');
const subscriptionRoute = require('./routes/routeSubscription');
const invoiceRoute = require('./routes/routeInvoice'); 



const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

app.use('/database', databaseRoute);
app.use('/user', userRoute);
app.use('/subscription', subscriptionRoute);
app.use('/invoice', invoiceRoute);
app.use('/files', fileRoute);

app.listen(8000, () => {
    console.log("server lancé sur port 8000");
});