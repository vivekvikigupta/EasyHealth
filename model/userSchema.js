
const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    health_id: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    contact_number:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    }
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient