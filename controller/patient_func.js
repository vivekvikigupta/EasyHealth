
const Patient = require('../model/patientSchema')
const bcrypt = require('bcrypt')

const reg_patient = async (req, res)=>{
    const {health_id, name, age, contact_number, address, password} = req.body

    //check if any field are empty
    if(!health_id || !name || !age || !contact_number || !address || !password){
        res.status(404).json({err : "Please fill the field Property!"})
    }
    else{
        try{

            //check for health_id , if it already exist
            const patientExist = await Patient.findOne({health_id: health_id})
            console.log(patientExist)
            //check if health_id already registered.
            if(patientExist){
                return res.status(404).json({err: "Patient already Exists"})
            }
            else{
                //generatig new object
                const patient = new Patient({health_id, name, age, contact_number, address, password})

                //hashing the password

                //generating salt
                const salt = await bcrypt.genSalt(12)

                //replacing password to hashed password
                patient.password = await bcrypt.hash(patient.password, salt)

                await patient.save(()=>{
                    console.log("patient added to database.")
                })
                res.status(200).json({message: "Patient registered Successfully"})
                
            }
    
        }catch(err){
            console.log(err)
            res.status(400).json({"error": err})
        }
    
    } 
}

const login_patient = async (req, res) => {
    const { health_id, password } = req.body

    //check if fields are empty
    if( !health_id || !password ){
        return res.status(404).json({err:"Please fill the field"})
    }
    else{
        try{
            const existingPatient = await Patient.findOne({health_id : health_id})

            if(existingPatient){
                //checking password
                const validPatient = await bcrypt.compare(password, existingPatient.password)
                
                if(validPatient){
                    res.status(200).json({message:"Patient logged in successfully!"})
                }else {
                    res.status(400).json({ error: "Invalid Password" });
                }
            }
            else{
                res.status(404).json({err:"Patient not registered!"})
            }

        }catch(err){
            console.log(err)
            res.status(400).json({"error": err})
        }
    }
}

module.exports = { reg_patient, login_patient }