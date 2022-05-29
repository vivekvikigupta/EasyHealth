const express = require('express')
const router = express.Router()
const Patient = require('../model/patientSchema')
const { reg_patient, login_patient } = require('../middlewares/patient_func')
const { reg_doctor, login_doctor } = require('../middlewares/doctor_func')



router.get('/', (req, res)=>{
    res.send("Hello from router server")
})


router.post('/reg_patient', reg_patient)

router.post('/login_patient', login_patient)

router.post('/reg_doctor', reg_doctor)

router.post('/login_doctor', login_doctor)

module.exports = router