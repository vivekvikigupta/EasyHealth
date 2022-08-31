const appointment = require('../model/appointmentSchema');
const Doctor = require('../model/doctorSchema')
const Patient = require('../model/patientSchema')

const bookappointment = async (req, res)=>{
    
    var {appointment_id, date, doc_reg_num, patient_health_id} = req.body;

    //formating date
    date = Date.parse(date)
    date = new Date(date)

    //check for doc & patient existance
    const docE = await Doctor.findOne({registration_num : doc_reg_num})
    const PatientE = await Patient.findOne({health_id : patient_health_id})
    if(docE && PatientE){
        //if both exists

        //selecting appointment number on a specific date
        const filter = { date : {$eq : date} }
        const app_filter = await appointment.aggregate([{$match : filter}])

        const appointment_num = app_filter.length + 1

        const newapp = new appointment({appointment_id, appointment_num, date, doc_reg_num, patient_health_id})
        await newapp.save()

        const bookedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        console.log(`Appointment booked on ${bookedDate} with appointment number : ${appointment_num}`)

        res
         .status(200)
         .json({message :`Appointment booked on ${bookedDate} with appointment number : ${appointment_num}`})
    }
    else{
        console.log("Patient or Doctor does not exists")
        res
         .status(400)
         .json({message : "Patient or Doctor does not exists"})
    }


}

module.exports = bookappointment