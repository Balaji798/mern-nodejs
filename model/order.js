const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        required: true,
        ref: 'User',
        trim: true
    },

    items: [{
        productId: {
            type: ObjectId,
            required: true,
            ref: 'Product',
            trim: true
        },
        quantity: { // minimum 1
            type: Number,
            required: true,
            trim: true
        }
    }],

    totalPrice: { // "Holds total price of all the items in the cart"
        type: Number,
        required: true,
        trim: true
    },

    totalItems: { // "Holds total number of items in the cart"
        type: Number,
        required: true,
        trim: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)