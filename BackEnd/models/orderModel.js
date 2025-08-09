const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: true,
    },
    items : {
        type : Array,
        required: true,
    },
    amount : {
        type : Number,
        required : true,
    },
    address : {
        type : Object,
        default : {},
        required : true,
    },
    status : {
        type : String,
        default : "Packing Toy Box"
    },
    date : {
        type : Date,
        default : Date.now
    },
    payment : {
        type : Boolean,
        default : false
    }
})

const ORDER = mongoose.models.order || mongoose.model('order',orderSchema)

module.exports = ORDER


