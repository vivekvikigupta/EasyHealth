const doctor = require('../../model/doctorSchema')
const appointmentModel = require('../../model/appointmentSchema') 

const checkappointments = async (req, res)=>{

    const { role, uid } = req.userInfo;
    var qcDate = req.query.cdate;
    var qnDate = req.query.ndate;
    var qpDate = req.query.pdate;
    var dateFlag = false
    
    if(!qcDate && !(qpDate || qnDate)){
        console.log("No date provided, fetching all appoinments for patient")
        dateFlag = true;
        console.log(dateFlag)
    }
    else{
        var qcDate = new Date(req.query.cdate);
        var qnDate = new Date(req.query.ndate);
        var qpDate = new Date(req.query.pdate);
    }

    try {
        if(dateFlag){
            qnDate = new Date("2050-12-30")
            qpDate = new Date("2001-01-02")
            console.log(qnDate, qpDate)
        }
        else if(qcDate){
            qcDate = new Date(qcDate)
            qnDate = new Date(qcDate.setDate(qcDate.getDate() + 1))
            qpDate = new Date(qcDate.setDate(qcDate.getDate() - 2))
            console.log(qnDate, qpDate)
        }
        else{
            throw Error("Date ot Queried correctly!!");
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error : error})
    }

    try {

        if(role === 'patient' && qpDate && qnDate){
            const pafilter = {date : {$gt : qpDate, $lt: qnDate}, patient_health_id : {$eq : uid}}
            const app_lst = await appointmentModel.aggregate([{$match : pafilter}]);
            console.log(app_lst)

            return res
                .status(200)
                .json(app_lst)
        }

        else if(role === 'doctor' && qpDate && qnDate){
            
            const dafilter = {date : {$gt : qpDate, $lt: qnDate}, registration_num : {$eq : uid}}
            const app_lst = await appointmentModel.aggregate([{$match : dafilter}]);
            console.log(app_lst)

            return res
                .status(200)
                .json(app_lst)
        }
        else{
            throw Error("Some Error with role or data fetching from database.")
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).json({error : error})
        
    }

}

module.exports = checkappointments