const express = require('express')
const router = express.Router()
const Patient = require('../model/userSchema')



router.get('/', (req, res)=>{
    res.send("Hello from router server")
})

router.get('/dashboard', (req, res)=>{
    res.send("Hello from dashboard")
})

router.get('/login', (req, res)=>{
    res.send("Hello from login")
})

router.get('/signup', (req, res)=>{
    res.send("Hello from signup")
})

router.post('/reg_patient', async (req, res)=>{
    const {health_id, name, age, contact_number, address} = req.body

    //check if any field are empty
    if(!health_id || !name || !age || !contact_number || !address){
        res.status(422).json({er : "Please fill the field Property!"})
    }
    try{

        //check for health_id , if it already exist
        


        const user = new Patient({health_id, name, age, contact_number, address})
        await user.save()
        res.status(200).json({message: "User registered"})

    }catch(err){
        console.log(err)
    }

    
})


module.exports = router