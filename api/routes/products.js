const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET /products'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === '1') {
        res.status(200).json({
            message: 'GET /product ID = 1',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'GET Other ID'
        });
    }
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST /products'
    });
});

module.exports = router;