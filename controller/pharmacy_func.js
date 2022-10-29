const pharma = require('../model/pharmacySchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const reg_pharmacy = async (req, res)=>{
    var { license_num, pharmacyName, pharmacyOwner, email, contact_num, address, password } = req.body

    //check if any field are empty
    if( !license_num || !pharmacyName || !pharmacyOwner || !email || !contact_num || !address || !password ){
        res.status(404).json({err : "Please fill the field Property!"})
    }
    else{
        try{

            //check for license_num , if it already exist
            const pharmaExist = await pharma.findOne({license_num: license_num})
    
            //check if license_num already registered.
            if(pharmaExist){
                console.log(`Pharmacy already registered : ${pharmaExist}`)
                return res.status(404).json({err: "Pharmacy already registered !"})
            }
            else{
                //hashing the password

                //generating salt & replacing password to hashed password
                const salt = await bcrypt.genSalt(12)
                password = await bcrypt.hash(password, salt)

                //generatig new object
                const pharmaModel = new pharma({ license_num, pharmacyName, pharmacyOwner, email, contact_num, address, password })

                await pharmaModel.save()
                res.status(200).json({message: "Store registered Successfully"})
                console.log("a item added to database.")
            }
    
        }catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    
    } 

}

// const login_pharmacy = async (req, res)=>{
//     const { username, password } = req.body

//     const license_num = username;

//     //check if fields are empty
//     if( !license_num || !password ){
//         return res.status(400).json({err:"Please fill the field"})
//     }
//     else{
//         try{
//             const existingmedStore = await pharma.findOne({license_num : license_num})

//             if(existingmedStore){
//                 //checking password
//                 const validmedStore = await bcrypt.compare(password, existingmedStore.password)
                
//                 if(validmedStore){

//                     //generating token
//                     const token = await jwt.sign(existingmedStore.toJSON(), process.env.secret_k)
//                     console.log("pharma token created.")

//                     return res
//                         .cookie('jwttoken', token, {
//                             httpOnly : true,
//                             expires: new Date(Date.now() + 8640000) //expiry is for one day
//                         })
//                         .status(200)
//                         .json({message:"Store logged in successfully!"})
//                 }else {
//                     res.status(401).json({ error: "Invalid Password" });
//                 }
//             }
//             else{
//                 res.status(404).json({error:"Store not registered!"})
//             }

//         }catch(err){
//             console.log(err)
//         }
//     }

// }

module.exports = { reg_pharmacy }