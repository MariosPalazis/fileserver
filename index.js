const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import Routes
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/images');

dotenv.config();
//Connect to db
mongoose.connect(process.env.DB_CONNECT , ()=>{
    console.log('connected to db!'); 
})

//Middleware
app.use(express.json());
//Middleware Routes
app.use('/api/user', authRoute);
app.use('/api/images', imageRoute);

app.listen(8000,"192.168.1.65", ()=>{
    console.log('Server running on 8000!');
});
