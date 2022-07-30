const express = require('express')
const router = express.Router()
const Patient = require('../model/patientSchema')
const { reg_patient, login_patient } = require('../controller/patient_func')
const { reg_doctor, login_doctor } = require('../controller/doctor_func')
const { reg_medStore, login_medStore } = require('../controller/medStore_func')



router.get('/', (req, res)=>{
    res.json("Hello from router server")
})


router.post('/reg_patient', reg_patient)
router.post('/login_patient', login_patient)

router.post('/reg_doctor', reg_doctor)
router.post('/login_doctor', login_doctor)

router.post('/reg_medStore', reg_medStore)
router.post('/login_medStore', login_medStore)



module.exports = router