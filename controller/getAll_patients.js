const patient = require('../model/patientSchema')
const getAll_patients = async(req, res)=>{
    
    const projection = {
        _id : 0,
        health_id:1,
        name : 1,
        age : 1,
        contact_number : 1,
        address : 1
    }
    const data = await patient.find({}, projection)
    //console.log(data)
    res.status(200).json(data)
}

module.exports = getAll_patients