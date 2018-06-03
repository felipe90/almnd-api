const moongose = require('mongoose')

const productsSchema = moongose.Schema(
    {
        _id: moongose.Schema.Types.ObjectId,
        name: String,
        price: Number
    }
)

module.exports = moongose.model('Product', productsSchema)