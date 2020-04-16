const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const productsRoute = require('./routes/products');
dotenv.config();

//Import routes
const authRoute = require('./routes/auth');

//Connect Database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },() => console.log("Connected to Database"));

//Middleware
app.use(express.json());

//Router Middleware
app.use('/api/user',authRoute);
app.use('/api/product',productsRoute);
//Start App
app.listen(3000,() => console.log('Server up and running'));