const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./route/auth');
const app = express();

require('dotenv/config');
// connect to database
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true},()=>
    console.log('Yeay Database Connect....')
);

//midleware
/*Body parser in express */
app.use(express.json());
/*if you use postman, this code to turn on x-www-form-urlencode */
app.use(express.urlencoded({ extended: true }))

//midleware route
app.use('/api/user',authRoute);

app.listen(5000,()=>console.log('Server up and running!'))