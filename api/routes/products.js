const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')

//Models
const Product = require('../models/product');

//Router
const router = express.Router();

//Misc
const selectQuery = '_id name stars price image amenities';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null,true)
    } else {
        cb(new Error('Not supported file type'),false)
    }
}
const upload = multer({storage: storage, limits: {fileSize: 1024*1024*5 }, fileFilter: fileFilter})

//GET
router.get('/', (req, res, next) => {
    Product.find()
        .select(selectQuery)
        .then(docs => {
            console.log(docs)
            if (docs.length > 0) {
                const response = {
                    count: docs.length,
                    products: docs
                }
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

});

//GET by ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .select(selectQuery)
        .then(doc => {
            console.log(doc)
            if (doc) {
                const response = {
                    product: doc
                }
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: "Not valid entry found for this ID"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

//POST
router.post('/', upload.single('image'),(req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        stars: req.body.stars,
        price: req.body.price,
        image: req.file.originalname,
        amenities: req.body.amenities
    })
    product.save()
        .then(doc => {
            console.log(doc)
            res.status(201).json({
                message: "POST Created product successfully",
                createdProduct: doc
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

//UPDATE
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const setOps = {}
    for (const ops of req.body) {
        setOps[ops.propName] = ops.value
    }
    Product.findByIdAndUpdate({ _id: id }, { $set: setOps })
        .then(doc => {
            console.log(doc)
            res.status(200).json({
                message: `PATH updated product ID = ${id}`,
            });
        })
        .catch(err => {
            console.log(err)
            if (doc) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(404).json({
                    message: "Not valid entry found for this ID"
                })
            }
        })
});

//DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findByIdAndRemove({
        _id: id
    })
        .then(doc => {
            console.log(doc)
            res.status(200).json({
                message: `PATH deleted product ID = ${id}`,
            });
        })
        .catch(err => {
            console.log(err)
            if (doc) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(404).json({
                    message: "Not valid entry found for this ID"
                })
            }
        })
});

module.exports = router;