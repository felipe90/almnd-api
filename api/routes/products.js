const express = require('express');
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
    const product = {
        name : req.body.name,
        price : req.body.price        
    }
    res.status(201).json({
        message: 'POST /products',
        product: product
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