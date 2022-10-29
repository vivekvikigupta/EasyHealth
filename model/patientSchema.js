
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    health_id: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    dob:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required : true
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
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient