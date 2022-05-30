const mongoose = require("mongoose");


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