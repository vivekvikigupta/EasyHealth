
const prescription_model = require('../../model/prescriptionSchema')
const patient = require('../../model/patientSchema')


const add_prescription = async (req, res)=>{
    //getting data in body
    const {health_id, prescription_data} = req.body
    prescription_data.date = new Date()
    
    //check if any field is empty
    if(!health_id || !prescription_data.disease || !prescription_data.medicines || !prescription_data.doc_reg_num){
        return res.status(404).json({Error : "Plz enter the data"})
    }

    try {
        //find if patient exists or not
        const patient_exists = await patient.findOne({ health_id : health_id })
        const patient_pres_rec = await prescription_model.findOne({health_id : health_id})

        if(patient_exists && patient_pres_rec){
            //if patient record exists already -- update the precriptions array
            console.log("prescription exits, so updatin record")

            prescription_model.findOneAndUpdate({health_id : health_id}, {$push : {prescriptions : prescription_data}}, ()=>{
                console.log("prescriptions updated")
            })
            res.status(200).json({message : "Updated prescription record"})
        }
            //in case rec does not exists, create first record of precriptions
        else if(patient_exists && !patient_pres_rec){

            const pres_obj = new prescription_model({health_id : health_id, prescriptions : [prescription_data]})
            //always remember below line in nested schemas, this really irritated me***
            pres_obj.markModified('prescriptions')

            await pres_obj.save((err)=>{
                if(err){
                    throw Error(err)
                }
                else{
                    console.log("Fisrt Record for patient added successfully")
                }
            })
            res.status(200).send("First prescription added")
        }
         
        else{
            res.status(404).json({error : "Patient not registered"})
        }
              
    } catch (error) {
        res.status(400).send({error : error})
        
    }
}
module.exports = add_prescription