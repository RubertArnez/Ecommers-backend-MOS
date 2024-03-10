const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength:255
    },
    // createdAt:
    // type: Number,
    // default: Date.now
}) 



module.exports = mongoose.model('Category', categorySchema)
// categories