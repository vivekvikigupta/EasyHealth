const patient = require('../model/patientSchema')
const prescription = require("../model/prescriptionSchema")
const jwt = require('jsonwebtoken')
const secret_key = process.env.secret_k

//only for doctor
const patient_profile = async (req, res) => {

    const token = req.cookies.jwttoken;

    // if(!token){
    //     console.log("token not found")
    //     return res.status(403).send({message: "please login first"}); 
    // }

    try {
        
        const user = jwt.verify(token, secret_key)
    
        const patient_data = await patient.find({health_id : user.health_id}, {health_id : 1, name : 1, dob : 1, email : 1, contact_num : 1, address : 1})
        console.log(patient_data)

        var allpres = await prescription.find({health_id : user.health_id})
        

        if(allpres[0]){
            
            allpres = (allpres[0].prescriptions).sort((a, b) =>b.date - a.date)
            console.log(allpres)
            
            return res.status(200).json({patient_data : patient_data[0], prescriptions : allpres})
        }
        else{
            console.log("No prescription record for this patient yet.")
            return res
                    .status(200)//503
                    .json({patient_data : patient_data[0], prescriptions : ""})
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({error : "Some Error occured"})
    }
}

module.exports = patient_profile