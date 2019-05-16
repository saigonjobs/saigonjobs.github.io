const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    path: {
        type : String,
        required : true
    },
    discription: {
        type : String,
        required : true
    },
    title: {
        type : String,
        required : true
    },
    price: {
        type : String,
        required : true
    },

})
module.exports = mongoose.model('Product',schema);