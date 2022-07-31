const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')
const getAll_patients = require('../controller/getAll_patients.js')
const {patient_pres_rec, patient_detail} = require('../controller/getPatientRecord')
const Authenticate  = require('../middlewares/authenticate')



router.post('/add_prescriptions', add_prescriptions)
router.get('/getAll_patients',Authenticate(["patient", "doctor"]), getAll_patients)
router.get('/patient_pres_rec/:hid', patient_pres_rec )
router.get('/patient_detail/:hid', patient_detail )

module.exports = router