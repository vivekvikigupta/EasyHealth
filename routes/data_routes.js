const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')
const getAll_patients = require('../controller/getAll_patients.js')
const {patient_pres_rec, patient_detail} = require('../controller/getPatientRecord')
const Authorize  = require('../middlewares/authorize')
const bookappointment = require('../controller/bookappointment')
const checkappointments = require('../controller/checkappointments')
const patientProfile = require('../controller/patientprofile')



//imp note : to authorization for specific role(patient, doctor, pharmacy) to a specific route, just add middleware Authorize with arguments of array of roles
//  For Example : router.get('/patient_pres_rec/:hid',Authorize(["doctor", "medical_store"]), patient_pres_rec )

router.post('/add_prescriptions', add_prescriptions)
router.get('/getAll_patients', getAll_patients)
router.get('/patient_pres_rec/:hid', patient_pres_rec )
router.get('/patient_detail/:hid', patient_detail )

router.post('/bookappointment', bookappointment)
router.get('/appointments', checkappointments)
router.get('/patientprofile', Authorize(["patient"]), patientProfile)
module.exports = router

