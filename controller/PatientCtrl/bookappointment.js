const appointment = require('../../model/appointmentSchema');
const Doctor = require('../../model/doctorSchema')
const Patient = require('../../model/patientSchema')

const bookappointment = async (req, res)=>{
    
    var {date, doc_reg_num} = req.body;
    var patient_health_id = req.userInfo.uid
    var name = req.userInfo.name
    //replacing / with - for date valid format
    var d = date.split('/')
    date = `${d[2]}-${d[1]}-${d[0]}`
    //formating date
    date = Date.parse(date)
    date = new Date(date)

    try {
        //check for doc & patient existance
        const docE = await Doctor.findOne({registration_num : doc_reg_num})
        const PatientE = await Patient.findOne({health_id : patient_health_id})
       
        if(docE && PatientE){//if both exists
            
            //selecting appointment number on a specific date
            const filter = { date : {$eq : date}, doc_reg_num : { $eq : doc_reg_num} }
            const app_filter = await appointment.aggregate([{$match : filter}])
    
            const appointment_num = app_filter.length + 1
    
            const app_doc = new appointment({appointment_num, date, doc_reg_num, patient_health_id})
            await app_doc.save()
    
            const bookedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
            console.log(`Booked for ${bookedDate} with doctor ${docE.name}(${docE.registration_num}) appointment number : ${appointment_num} for ${name} (id : ${patient_health_id})`)
    
            res
             .status(200)
             .json({message :`Booked for ${bookedDate} with doctor ${docE.name}(${docE.registration_num}) appointment number : ${appointment_num} for ${name} (id : ${patient_health_id})`})
        }
        else{
            throw new Error("Doctor or patient doesn't exists")
        }
    } catch (error) {
        res
            .status(400)
            .json({error: error.message})
        
    }
    
}

module.exports = bookappointment