const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products');

//DB
// const uriTestDb = `mongodb://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0-shard-00-00-tstz8.mongodb.net:27017,cluster0-shard-00-01-tstz8.mongodb.net:27017,cluster0-shard-00-02-tstz8.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
const uriDb = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0-tstz8.mongodb.net/test?retryWrites=true`;


mongoose.connect(uriDb)
    .catch(err => {
        console.log(err)
    });

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Atlas')
})

//APP Config
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORDS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use('/products', productRoutes);


//Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;