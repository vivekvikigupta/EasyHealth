const mongoose = require('mongoose')

const prescriptionSchema = {
    health_id : {
        type : Number,
        require : true
    },
    prescriptions :[
            {
                disease : {
                    type : String
                },
                date : {
                    type : Date
                },
                medcines : {
                    type : String
                },
                doc_reg_num : {
                    type : String
                }
            }
        ]
}

const prescriptions = mongoose.model('prescription', prescriptionSchema)

module.exports = prescriptions