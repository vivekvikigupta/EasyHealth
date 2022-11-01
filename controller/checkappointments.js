const jwt = require('jsonwebtoken')
const doctor = require('../model/doctorSchema')
const appointmentModel = require('../model/appointmentSchema') 

const secret_key = process.env.secret_k


const checkappointments = async (req, res)=>{

    try {
        //take data in headers
        const token = req.cookies.jwttoken
        
        var qDate = new Date(req.query.date)
        console.log(qDate)

        const nxtDate = new Date(qDate.setDate(qDate.getDate() + 1))
        const preDate = new Date(qDate.setDate(qDate.getDate() - 2))
        console.log(nxtDate )
        console.log(preDate )
        
        
        
        const userData = jwt.decode(token, secret_key)
        console.log(userData)
        
        const validateDoc = await doctor.find({registration_num : userData.registration_num})
    
        if(validateDoc){
            // console.log(validateDoc)

            //after validating the doctor, fetch details of current appointments
            const filter = {date : {$gt : preDate, $lt: nxtDate}, doc_reg_num : {$eq : userData.registration_num}}
            const currentapp = await appointmentModel.aggregate([{$match : filter}])
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