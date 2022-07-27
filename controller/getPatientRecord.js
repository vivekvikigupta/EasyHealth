const pres_schema = require('../model/prescriptionSchema')
const patientSchema = require('../model/patientSchema')

const patient_pres_rec = async(req, res)=>{

    try {

        const hid = req.params.hid
        const doc_num = req.query.doc
        
        var pres_data = await pres_schema.find({health_id : hid})
        //filter prescriptio record in desc order
        pres_data = await pres_data[0].prescriptions.sort((a,b) => a.date - b.date)//sortin using simplified for numeric (c/o Andre Figueiredo):

        //filter for prescriptions by only specific doctor
        if(doc_num){
            pres_data = pres_data.filter((obj)=>{
                return obj.doc_reg_num === doc_num
            })
        }
        console.log(pres_data)
        
        return res
            .status(200)
            .send(pres_data)
        
    } catch (error) {
        console.log(error)
        res.status(400)
        
    }

}

const patient_detail = async(req, res)=>{

    try {
        
        const hid = req.params.hid
        const patient = await patientSchema.find({health_id : hid})
        return res
            .status(200)
            .send(patient)

    } catch (error) {
        console.log(error)
        res.status(400)
        
    }
}

module.exports = {patient_pres_rec, patient_detail}