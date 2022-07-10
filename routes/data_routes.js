const express = require('express')
const router = express.Router()
const add_prescriptions = require('../controller/prescription')



router.post('/add_prescriptions', add_prescriptions)

module.exports = router