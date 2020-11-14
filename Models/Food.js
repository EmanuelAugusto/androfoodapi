const mongoose = require('mongoose')
const Schema = mongoose.Schema

var FoodSchema = new Schema({
    idSalesman:{
        type: String,
        required: "salesman is required",
    },
    nome: {
        type: String,
        required: "Digite o nome da Tarefa"
    },
    imagem:{
        type: String,
        required: "envie uma imagem"
    },
    loja:{
        type: String,
        required: "Digite o nome da Loja"
    },
    preco:{
        type: Number,
        required: "Digite o preço da refeição"
    },
    description:{
        type: String,
        default: "Sem descrição"
    },
    erased:{
        type: Number,
        default: 0
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    owner:[{
        type: Schema.Types.ObjectId,
        ref: "Salesman"
    }],
    status: {
        type: [{
            type: String,
            enum: ['Oriental', 'Árabe', "Contemporânea", "Brasileira"]
        }],
        default: "Brasileira"
    }

})


module.exports = mongoose.model("Food", FoodSchema)