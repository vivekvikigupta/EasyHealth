const prescription = require('../../model/prescriptionSchema')
const patientSchema = require('../../model/patientSchema')

const patient_pres_rec = async(req, res)=>{

    const {name, role, uid} = req.userInfo;
    console.log(name, role, uid)
    const query_id = req.query.uid;
    var pres_rec;

    try {
        if(role === 'doctor' && query_id){
            var pres_rec = await prescription.find({health_id : query_id})
        }
        else if(role === 'patient'){
            var pres_rec = await prescription.find({health_id : uid})
        }
        else{
            throw Error("Unauthorised!")
        }
        
        if(pres_rec[0]){
            
            pres_rec = (pres_rec[0]).prescriptions.sort((a, b) =>b.date - a.date)
            
        }
        console.log(pres_rec);

        return res
                .status(200)
                .json({prescriptions : pres_rec})
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({error : "Some Error occured"})
    }

}

module.exports = {patient_pres_rec}