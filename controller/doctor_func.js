
const Doctor = require('../model/doctorSchema')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const secret_key = process.env.secret_k

const reg_doctor = async (req, res)=>{
    var { registration_num, name, speciality, email, contact_number, address, password } = req.body

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

            //check for registraion_num , if it already exist
            const doctorExists = await Doctor.findOne({registration_num: registration_num})
            
            //check if registration_num already registered.
            if(doctorExists){
                return res.status(409).json({err: "Doctor already Exists"})
            }
            else{
                //hashing the password

                //generating salt & replacing password to hashed password
                const salt = await bcrypt.genSalt(12)
                password = await bcrypt.hash(password, salt)
                
                //generatig new object
                const doctor = new Doctor({ registration_num, name, speciality, email, contact_number, address, password })

                await doctor.save()
                res.status(200).json({message: "Doctor registered Successfully"})
                console.log("a item added to database.")
            }
    
        }catch(err){
            console.log(err)
            res.status(400).json({message : "Some error occured"})
        }
    
    } 
}

// const login_doctor = async (req, res) => {
//     const { username, password } = req.body
    

//     // doctor's registration number used as username
//     const registration_num = username

//     console.log(registration_num, password)
//     //check if fields are empty
//     if( !registration_num || !password ){
//         return res.status(404).json({error:"Please fill the field"})
//     }
//     else{
//         try{
//             const existingDoctor = await Doctor.findOne({registration_num : registration_num})
           
//             if(existingDoctor){
//                 //checking password
//                 const validDoctor = await bcrypt.compare(password, existingDoctor.password)
                
//                 if(validDoctor){
//                     //create a token
//                     const token = await jwt.sign(existingDoctor.toJSON(), secret_key)
//                     console.log("doctor token created")
                    
//                     return res
//                         .cookie("jwttoken", token, {
//                             httpOnly : true,
//                             SameSite: 'None',
//                             Secure : true,
//                             expires: new Date(Date.now() + 8640000),
                           
//                         })
//                         .status(200)
//                         .json({message:"Doctor logged in successfully!"})
                        
//                 }else {
//                     res.status(400).json({ error: "Invalid Password" });
//                 }
//             }
//             else{
//                 res.status(404).json({error:"Doctor not registered !"})
//             }

//         }catch(err){
//             console.log(err)
//         }
//     }
// }

module.exports = { reg_doctor }