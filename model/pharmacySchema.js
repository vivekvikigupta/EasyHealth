const mongoose = require("mongoose");
const validator = require('validator')


const pharmacySchema = {
    license_num:{
        type: String,
        required: true
    },
    pharmacyName:{
        type: String,
        required: true
    },
    pharmacyOwner:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    contact_num:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}

const pharma = mongoose.model('pharma_store', pharmacySchema)

module.exports = pharma