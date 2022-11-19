const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')
const getAll_patients = require('../controller/getAll_patients.js')
const {patient_pres_rec, patient_detail} = require('../controller/PatientCtrl/getPatientRecord')
const Authorize  = require('../middlewares/authorize')
const bookappointment = require('../controller/PatientCtrl/bookappointment')
const checkappointments = require('../controller/checkappointments')
const patientProfile = require('../controller/patientprofile')
const getdoctorslist  = require('../controller/PatientCtrl/getDoctorsList')
const profile = require('../controller/common/profile')



//imp note : to authorization for specific role(patient, doctor, pharmacy) to a specific route, just add middleware Authorize with arguments of array of roles
//  For Example : router.get('/patient_pres_rec/:hid',Authorize(["doctor", "medical_store"]), patient_pres_rec )
router.get('/getAll_patients', getAll_patients)

//routes for patient
router.post('/bookappointment', Authorize(["doctor", "patient", "pharmacy"]), bookappointment)
router.get('/patientprofile', Authorize(["patient"]), patientProfile)
router.get('/getdoctor',Authorize(["doctor", "patient", "pharmacy"]), getdoctorslist )

//routes for doctors

router.post('/add_prescriptions', add_prescriptions)
router.get('/chckappointments',Authorize(["doctor"]), checkappointments)

//common routes
router.get('/patient_pres_rec/:hid', Authorize(["doctor", "patient"]), patient_pres_rec )
router.get('/patient_detail/:hid', Authorize(["doctor", "patient"]), patient_detail )
router.get('/profile',Authorize(["doctor", "patient"]), profile )


module.exports = router

