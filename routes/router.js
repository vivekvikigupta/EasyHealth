const express = require('express')
const router = express.Router()
const Patient = require('../model/patientSchema')
const { reg_patient } = require('../controller/register/reg_patient')
const { reg_doctor } = require('../controller/register/reg_doctor')
const { reg_pharmacy } = require('../controller/register/reg_pharmacy')
const login = require('../middlewares/authenticate')



//routes for user registration
router.post('/reg_patient', reg_patient)
// router.post('/login_patient', login_patient)

router.post('/reg_doctor', reg_doctor)
// router.post('/login_doctor', login_doctor)

router.post('/reg_pharmacy', reg_pharmacy)
// router.post('/login_medStore', login_pharmacy)

//route for login of all users
router.post('/login', login)




module.exports = router