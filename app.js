const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const collectionsRoutes = require('./api/routes/collections');
const coinsRoutes = require('./api/routes/coins');
const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb://cc:' + process.env.MONGO_ATLAS_PW + '@freecluster-shard-00-00-7mhl6.mongodb.net:27017,freecluster-shard-00-01-7mhl6.mongodb.net:27017,freecluster-shard-00-02-7mhl6.mongodb.net:27017/test?ssl=true&replicaSet=FreeCluster-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true });

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Orgin','*');
    res.header('Access-Control-Allow-Headers',
               'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method==='OPTIONS'){
        //  TODO: VERIFY DO I NEED ALL OF THEM
        req.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
        return res.status(200).json({}); 
    }
    next();
});

//Routes which should handle requests
app.use('/collections', collectionsRoutes);
app.use('/coins', coinsRoutes);
app.use('/users', userRoutes);

//Errors handler
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, reg, res, next) => {
 res.status(error.status || 500);
 res.json({
    error:{
        message: error.message 
    }
 });
});

module.exports = app;

