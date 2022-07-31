const jwt  = require('jsonwebtoken')
const patient = require('../model/patientSchema')
const secret_key = process.env.secret_k

const Authenticate = (roles)=>{
    return async (req, res, next)=>{
        try {
            //getting cookie
            const token = req.cookies.jwttoken

            //asynchronous jwt
            jwt.verify(token, secret_key, (err, decode)=>{
                if(err){
                    console.log("token error")
                    return res.status(400).json({error : "No token  found"})
                }
                else{

                    //fetching role for logged in user
                    var role;
                    if(decode.health_id)
                        role = "patient"
                    else if(decode.registration_num)
                        role = "doctor"
                    else
                        role = "medical_store"
                    
                    //authorising to roles
                    if(roles.includes(role)){
                        console.log("You have permission")
                        return res.status(200).json({msg : "authorised"})
                    }
                    else{
                        console.log("You don't have permission")
                        return res.status(401).json({msg : "Unauthorised user. Access Denied"})
                    }
                    
                }
            next()
            })
        } catch (error) {
            console.log(error)
            return res.status(401).send({error : "Unauthorised access"}) 
        }
    }
}

module.exports = Authenticate