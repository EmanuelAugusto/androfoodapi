const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ExtractBuySchema = new Schema({
    idFood:[{
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: "Food is required"
    }],
    idClient:[{
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: "Client is required"
    }],
    idSalesman:[{
        type: Schema.Types.ObjectId,
        ref: "Salesman",
        required: "Salesman is required"
    }],
    paymentId:{
        type: String,
        default: ""
    },
    price:{
        type: Number,
        required: "price is required"
    },
    quantity:{
        type: Number,
        required: "quantity is required"
    },
    dataCreated: {
        type: Date,
        default: Date.now
    },
    status:{
        type: [{
            type: String,
            enum: ['Processando', 'Pago', "Atendido"]
        }],
        default: "Processando"
    }
})


module.exports = mongoose.model("ExtractBuy", ExtractBuySchema)