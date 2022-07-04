
const prescriptions = require('../model/prescriptionSchema')
const patient = require('../model/patientSchema')

const prescription = async (req, res)=>{
    // const a = req.body
    // console.log(a.prescriptions[0].disease)
    // res.status(200).send("Ok")
    const {health_id, prescription} = req.body
    if(!health_id || !prescription){
        res.status(404).json({Error : "Plz enter the data"})
    }
    try {
        
        // console.log(a.prescriptions[0].disease)
        // res.status(200).send("Ok")
        patient_exists = await patient.findOne({ health_id : health_id })
        if(patient_exists){
            console.log("GoAhead")
        }
        else{
            res.status(404).json({error : "Patient not registered"})
        }
        
    } catch (error) {
        res.status(400).send({error : error})
        
    }
}
module.exports = prescription