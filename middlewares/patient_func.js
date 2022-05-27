
const Patient = require('../model/userSchema')

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
    
            //check if health_id already registered.
            if(patientExist){
                return res.status(404).json({err: "Patient already Exists"})
            }
            else{
                const user = new Patient({health_id, name, age, contact_number, address, password})
                await user.save()
                res.status(200).json({message: "Patient registered Successfully"})
                console.log("a item added to database.")
            }
    
        }catch(err){
            console.log(err)
        }
    
    } 
}

module.exports = reg_patient