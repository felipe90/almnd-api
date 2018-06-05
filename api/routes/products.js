const express = require('express');
const multer = require('multer')

//Router
const router = express.Router();

//Controllers
const productsController  = require("../controllers/products");

//Misc
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Not supported file type'), false)
    }
}
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

router.get('/', productsController.products_get_all);

router.get('/:id', productsController.products_get_by_id);

router.post('/', upload.single('image'), productsController.product_create_single);

router.patch('/:id', productsController.product_update_single);

router.delete('/:id', productsController.product_delete_single);

module.exports = router;