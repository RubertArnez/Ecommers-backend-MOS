const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 80,
    },
    fullDescripcion: {
        type: String,
        required: false,
        minlength: 4,
        maxlength: 600,  
    },
    price: {
        type: Number,
        required: false,
        min: 1,
        max: 120000000,
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now //Sin los parentesis como en JS
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    active: {
        type: Boolean,
        default: true
    }

    // dateIngreso: {
    //     type: String,
    //     required: false,
    // },
   

})

module.exports = mongoose.model('Product', productSchema)
