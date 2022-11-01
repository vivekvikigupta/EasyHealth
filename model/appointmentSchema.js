const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    appointment_id : {
        type : Number,
        require : true,
        default : 0
    },
    appointment_num : {
        type : Number,
        require : true
    },
    date : {
        type : Date,
        require : true
    },
    doc_reg_num : {
        type : String,
        require : true
    },
    patient_health_id : {
        type : Number,
        require : true
    }

})

const appointment = mongoose.model('appointment', appointmentSchema)

module.exports = appointment