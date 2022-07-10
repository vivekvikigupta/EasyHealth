const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')
const getAll_patients = require('../controller/getAll_patients')



router.post('/add_prescriptions', add_prescriptions)
router.get('/getAll_patients', getAll_patients)

module.exports = router