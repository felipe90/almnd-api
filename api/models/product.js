const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, require: true },
        stars: { type: Number, require: true },
        price: { type: Number, require: true },
        image: { type: String, require: false },
        amenities: { type: Array, require: false },
    }
)

module.exports = mongoose.model('Product', productSchema)