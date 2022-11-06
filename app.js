const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const cors = require('cors')

//setting path to config file
dotenv.config({path: './vars/config.env'})//to be removed in prod

const app = express()
const PORT = process.env.PORT

app.use(cookieparser())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : false}))
app.use(cors({credentials: true, origin: ['http://localhost:3000']})) // to be remove for production
require('./db/conn')

//this will route all urls
app.use(require('./routes/router'))
app.use(require('./routes/data_routes'))
//in case url not found, this middleware will act

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
    path.resolve(__dirname, 'client', )
}
// app.use((req, res)=>{
//     res.status(400).send("Not Found!")
// })



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})