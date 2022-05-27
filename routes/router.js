const express = require('express')
const reg_patient = require('../middlewares/patient_func')
const router = express.Router()
const Patient = require('../model/userSchema')
const reg_patient_func = require('../middlewares/patient_func')



router.get('/', (req, res)=>{
    res.send("Hello from router server")
})


router.post('/reg_patient', reg_patient_func)


module.exports = router