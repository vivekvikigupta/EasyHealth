const mongoose = require('mongoose')

const prescriptionSchema = new mongoose.Schema({
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
    
})

const prescription_model = mongoose.model('prescription', prescriptionSchema)

module.exports = prescription_model