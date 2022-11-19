const Patient = require('../../model/patientSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const reg_patient = async (req, res)=>{
    var {health_id, name, dob, email, contact_num, address, password} = req.body

    //in case of space only -- filtering them out
    var iflag = false
    Object.values(req.body).map((i)=>{
        var s = i.toString();
        s = s.replace(/ /g,"");
        if(s.length === 0){
            iflag = true
            console.log("Found empty field")
        }
    })
    
    //check if any field are empty
    if(iflag){
        res.status(404).json({err : "Please fill the field Property!"})
    }
    else{
        try{
            //check for health_id , if it already exist
            const patientExist = await Patient.findOne({health_id: health_id})
            
            //check if health_id already registered.
            if(patientExist){
                console.log(patientExist)
                return res.status(409).json({err: "Patient already Exists"})
            }
            else{
                //hashing the password

                //generating salt & replacing password to hashed password
                const salt = await bcrypt.genSalt(12)
                password = await bcrypt.hash(password, salt)
                
                //generatig new object
                const patient = new Patient({health_id, name, dob, email, contact_num, address, password})

                await patient.save(()=>{
                    console.log("patient added to database.")
                })
                res.status(200).json({message: "Patient registered Successfully"})
            }
    
        }catch(err){
            console.log(err)
            res.status(400).json({err: err})
        }
    } 
}

module.exports = { reg_patient }