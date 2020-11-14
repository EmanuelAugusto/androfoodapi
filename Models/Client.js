const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

var ClientSchema = new Schema({
    nameclient: {
        type: String,
        required: "Enter the name of the salesman"
    },
    image: {
        type: String,
        required: "Enter one Image"
    },
    typeProfile:{
        type: String,
        set: (value) => "client"
    },
    email: {
        type: String,
        required: "email is required",
        uniqued: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: "password is required",
        select: false,
        set: (value) => bcrypt.hashSync(value, 10)
    },
    cpf: {
        type: String,
        required: "address is required"
    },
    address: {
        type: String,
        required: "address is required"
    },
    erased:{
        type:Number,
        default: 0
    }
})


module.exports = mongoose.model("Client", ClientSchema)