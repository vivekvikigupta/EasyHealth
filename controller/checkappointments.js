const jwt = require('jsonwebtoken')
const doctorModel = require('../model/doctorSchema')
const appointmentModel = require('../model/appointmentSchema') 

const secret_key = process.env.secret_k


const checkappointments = async (req, res)=>{

    try {
        //take data in headers
        const token = req.cookies.jwttoken
        
        var querydate = Date.parse(req.query.date)
        querydate = new Date(querydate)
        
        console.log(querydate)
        
        const userData = jwt.decode(token, secret_key)
        
        const validateDoc = await doctorModel.find({registration_num : userData.registration_num})
    
        if(validateDoc){
            // console.log(validateDoc)

            //after validating the doctor, fetch details of current appointments
            const filter = [{$match : {date : {$eq : querydate}}}]
            const currentapp = await appointmentModel.aggregate(filter)
            console.log(currentapp)

            res
                .status(200)
                .json(currentapp)
        }else{
            console.log("No doctor found")
            res
                .status(400)
                .json({message : "No appointments found on given date"})
        }
    
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error})
        
    }

}

module.exports = checkappointments