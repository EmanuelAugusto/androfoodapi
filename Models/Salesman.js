const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

var SalesmanSchema = new Schema({
    nameSalesman: {
        type: String,
        required: "Enter the name of the salesman"
    },
    image: {
        type: String,
        required: "Enter one Image"
    },
    typeProfile:{
        type: String,
        set: (value) => "salesman"
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
    cpforCnpj: {
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


module.exports = mongoose.model("Salesman", SalesmanSchema)