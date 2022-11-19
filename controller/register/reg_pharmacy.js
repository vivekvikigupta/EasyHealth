const pharma = require('../../model/pharmacySchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const reg_pharmacy = async (req, res)=>{
    var { license_num, pharmacyName, pharmacyOwner, email, contact_num, address, password } = req.body
    console.log(license_num, pharmacyName, pharmacyOwner, email, contact_num, address, password)
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
module.exports = { reg_pharmacy }