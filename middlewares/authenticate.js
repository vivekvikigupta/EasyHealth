const jwt  = require('jsonwebtoken')
const patient = require('../model/patientSchema')
const secret_key = process.env.secret_k

const Authenticate = (perm)=>{
    return (req, res, next)=>{
        console.log(perm)
        return res.status(200)
        next()
    }
}

module.exports = Authenticate