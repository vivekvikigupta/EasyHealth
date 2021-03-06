const mongoose = require("mongoose");
const validator = require('validator')


const medStoreSchema = {
    license_num:{
        type: String,
        required: true
    },
    storeName:{
        type: String,
        required: true
    },
    storeOwner:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email!")
            }
        }

    },
    contact_number:{
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

const medStore = mongoose.model('medStore', medStoreSchema)

module.exports = medStore