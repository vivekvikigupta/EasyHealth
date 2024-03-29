const mongoose = require('mongoose')

const db_url = process.env.MONGO_URL

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    mongoose.connection.useDb('EasyHealth')
    console.log("Database connected !")
})
.catch(()=>{
    console.log("databse connection unsuccessful")
})