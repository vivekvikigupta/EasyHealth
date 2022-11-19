//get profile of all roles
//pharmacy not authorised

const patient = require('../../model/patientSchema')
const doctor = require('../../model/doctorSchema')
const pharmacy = require('../../model/pharmacySchema')

const profile = async (req, res)=>{

    const {role, name, uid} = req.userInfo
    const qUser = req.query.uid
    var userData;
    var ufilter = {password : 0, _id : 0, __v : 0}
    try {
        if(qUser){
            userData = await patient.find({health_id : uid}, ufilter)
            console.log(userData)
        }
        else{
            switch(role){
                case 'doctor': userData = await doctor.find({registration_num : uid}, ufilter)
                    break;
                case 'patient': userData = await patient.find({health_id : uid}, ufilter)
                    break;
                case 'pharmacy': userData = await pharmacy.find({license_num : license_num}, ufilter)
                    break;
                default : throw Error("No Role/User Matched!")

            }
        }
        return res
            .status(200)
            .json({userData : userData[0]})
    } catch (error) {

        return res.
            status(401)
            .json({message : error})
    }
}

module.exports = profile;