//importing models
const Patient = require('../model/patientSchema')
const Pharmacy = require('../model/pharmacySchema')
const Doctor = require('../model/doctorSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret_key = process.env.secret_k

const login = async(req, res)=>{

    const {role, username, password} = req.body 
    console.log(role, username, password)

    const userid = username;
    var existingUser;

    try {
        switch(role){
            case 1 : //for doctor
                    existingUser = await Doctor.findOne({registration_num : userid});
                    break;
            case 2 : 
                    //for Patient
                    existingUser = await Patient.findOne({health_id : Number(userid)})
                    break;
            case 3 :
                    //for Pharmacy
                    existingUser = await Pharmacy.findOne({license_num : userid})
                    break;
            default : //incase role not registered
                    existingUser = false
                    throw new Error("Role does not exists !")
        }

    } catch (error) {
        console.log(res.message)
        return res
            .status(400)
            .json({error : error.message})
    }

    try {

        if(existingUser){
            const validUser = await bcrypt.compare(password, existingUser.password)
            if(validUser){
                const token = jwt.sign(existingUser.toJSON(), secret_key)
                console.log("User token created")
                return res
                    .cookie("jwttoken", token, {
                        httpOnly : true,
                        SameSite: 'None',
                        Secure : true,
                        expires: new Date(Date.now() + 8640000),
                    })
                    .status(200)
                    .json({message:"User logged in successfully!"})
            }
            else{
                throw new Error("Invalid Password")
                // res.status(400).json({ error: "Invalid Password" });
            } 
        }

        else{
            throw new Error("User Not Registered")
            // res.status(404).json({error:"Doctor not registered !"})
        }
    }
    catch (error) {
        
        console.log(error.message)
        return res
        .status(400)
        .json({error: error.message})
    }
}

module.exports = login