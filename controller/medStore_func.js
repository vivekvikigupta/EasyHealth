const medStore = require('../model/medStoreSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const reg_medStore = async (req, res)=>{
    const { license_num, storeName, storeOwner, email, contact_number, address, password } = req.body

    //check if any field are empty
    if( !license_num || !storeName || !storeOwner || !email || !contact_number || !address || !password ){
        res.status(404).json({err : "Please fill the field Property!"})
    }
    else{
        try{

            //check for license_num , if it already exist
            const medStoreExist = await medStore.findOne({license_num: license_num})
    
            //check if license_num already registered.
            if(medStoreExist){
                return res.status(404).json({err: "Store already registered !"})
            }
            else{
                //generatig new object
                const medstore = new medStore({ license_num, storeName, storeOwner, email, contact_number, address, password })

                //hashing the password

                //generating salt
                const salt = await bcrypt.genSalt(12)

                //replacing password to hashed password
                medstore.password = await bcrypt.hash(medstore.password, salt)

                await medstore.save()
                res.status(200).json({message: "Store registered Successfully"})
                console.log("a item added to database.")
            }
    
        }catch(err){
            console.log(err)
        }
    
    } 

}

const login_medStore = async (req, res)=>{
    const { username, password } = req.body

    const license_num = username;

    //check if fields are empty
    if( !license_num || !password ){
        return res.status(400).json({err:"Please fill the field"})
    }
    else{
        try{
            const existingmedStore = await medStore.findOne({license_num : license_num})

            if(existingmedStore){
                //checking password
                const validmedStore = await bcrypt.compare(password, existingmedStore.password)
                
                if(validmedStore){

                    //generating token
                    const token = await jwt.sign(existingmedStore.toJSON(), process.env.secret_k)
                    console.log("medStore token created.")

                    return res
                        .cookie('jwttoken', token, {
                            httpOnly : true,
                            expires: new Date(Date.now() + 8640000) //expiry is for one day
                        })
                        .status(200)
                        .json({message:"Store logged in successfully!"})
                }else {
                    res.status(401).json({ error: "Invalid Password" });
                }
            }
            else{
                res.status(404).json({error:"Store not registered!"})
            }

        }catch(err){
            console.log(err)
        }
    }

}

module.exports = { reg_medStore, login_medStore }