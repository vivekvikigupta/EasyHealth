express = require('express')
dotenv = require('dotenv')

//setting path to config file
dotenv.config({path: './vars/config.env'})

const app = express()
const PORT = process.env.PORT

app.use(express.json())
require('./db/conn')

//this will route all urls
app.use(require('./routes/router'))



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})