
const _ = require('lodash')
const mongoose = require('mongoose');
const multer = require('multer')
const Product = require('../models/product');
const dummyData = require('../../data/data');

//Misc
const selectQuery = '_id name stars price image amenities';

//dummy
const isDummyQuery = (req) => {
    return JSON.parse(req.query.dummy) 
}

const filterDummy = (key, query) => {
    let data = null;
    data = dummyData.filter((item) => {        
        if (key === 'name') return item[key].indexOf(query) > -1
        if (key === 'price') return item[key] === parseFloat(query)
        if (key === 'stars') return item[key] === parseInt(query)
    });
    console.log(data)
    return data;
}

//CONTROLLERS
exports.products_get_all = (req, res, next) => {
    if (isDummyQuery(req)) {
        if (Object.keys(req.query).includes("name")) res.status(200).json(filterDummy("name", req.query["name"]));
        if (Object.keys(req.query).includes("price")) res.status(200).json(filterDummy("price", req.query["price"]));
        if (Object.keys(req.query).includes("stars")) res.status(200).json(filterDummy("stars", req.query["stars"]));
        return
    } else {
        let _query = null;
        if (Object.keys(req.query).includes("name")) _query = { name: req.query["name"]}
        if (Object.keys(req.query).includes("price")) _query = { price: req.query["price"]}
        if (Object.keys(req.query).includes("stars")) _query = { stars: req.query["stars"]}
        Product
            .find(_query)
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

    }

}

exports.products_get_by_id = (req, res, next) => {
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
}

exports.product_create_single = (req, res, next) => {
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
}

exports.product_update_single = (req, res, next) => {
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
}

exports.product_delete_single = (req, res, next) => {
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
}