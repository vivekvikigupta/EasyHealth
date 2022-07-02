
const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    registration_num: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    speciality:{
        type:String,
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
})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor