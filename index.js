const express = require('express')
const routes = require('./Routes/api')
const bodyParser = require('body-parser')
var cors = require('cors')
const requireDir = require("require-dir");
require("dotenv").config();



const app = express(),
            mongoose = require('mongoose'),
            modelsMongo = requireDir('./Models');

app.use(cors())



const port = process.env.PORT || 3000

mongoose.Promise = global.Promise

var url = process.env.MONGOCONNECTION_STRING;

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use(bodyParser.json())
app.use(express.urlencoded({urlencoded:false}))
app.set('json spaces', 4)

app.use('/api', routes)


app.listen(port, ()=>{
    console.log("Server run in port " + port)
})
