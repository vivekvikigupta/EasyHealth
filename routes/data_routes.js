const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')
const getAll_patients = require('../controller/getAll_patients.js')
const {patient_pres_rec, patient_detail} = require('../controller/getPatientRecord')
const Authenticate  = require('../middlewares/authenticate')



router.post('/add_prescriptions',Authenticate(["doctor"]), add_prescriptions)
router.get('/getAll_patients',Authenticate(["doctor"]), getAll_patients)
router.get('/patient_pres_rec/:hid',Authenticate(["doctor", "medical_store"]), patient_pres_rec )
router.get('/patient_detail/:hid',Authenticate(["patient", "doctor"]), patient_detail )

module.exports = router