// this route is for providing all doctors available in while app booking in a specific category

const doctor = require('../../model/doctorSchema')

const getDoctorsList = async (req, res) =>{
    const sp= req.query.sp
    console.log(sp)
    
try {
    const docs = await doctor.find({speciality : {$eq : sp}}, {registration_num : 1})
    console.log(docs)
    var doc_list = []

    docs.map((i)=>{
        doc_list = [...doc_list, i.registration_num]
        
    })
    console.log(doc_list)
    
    res
        .status(200)
        .json({doc_list : doc_list})
    
} catch (error) {
    res
        .status(400)
        .json({error : error.message})
}

}

module.exports = getDoctorsList