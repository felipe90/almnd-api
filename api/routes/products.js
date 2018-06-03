const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET /products'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === '1') {
        res.status(200).json({
            message: `GET /product ID = ${id}`,
            id: id
        });
    } else {
        res.status(200).json({
            message: 'GET Other ID'
        });
    }
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.name
    })
    product.save()
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))

    res.status(201).json({
        message: 'POST /products',
        createdProduct: product
    });
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `PATH updated product ID = ${id}`,
        id: id
    });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: `PATH deleted product ID = ${id}`,
        id: id
    });
});

module.exports = router;