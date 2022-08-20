const express = require('express')
const router = express.Router()
const Patient = require('../model/patientSchema')
const { reg_patient, login_patient } = require('../controller/patient_func')
const { reg_doctor, login_doctor } = require('../controller/doctor_func')
const { reg_pharmacy, login_pharmacy } = require('../controller/pharmacy_func')



router.get('/', (req, res)=>{
    res.json("Hello from router server")
})

//routes for authentication
router.post('/reg_patient', reg_patient)
router.post('/login_patient', login_patient)

router.post('/reg_doctor', reg_doctor)
router.post('/login_doctor', login_doctor)

router.post('/reg_pharmacy', reg_pharmacy)
router.post('/login_medStore', login_pharmacy)



module.exports = router