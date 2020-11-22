const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const authController = require('../Auth/AuthController')
var mailService = require('../../Services/mailService')
var cieloService = require('../../Services/cieloService')


exports.paymentFood = async function (req, res) {

    try{
        var user = authController.authUserSalesman(req)


        let payment = {
            nameClient: user.user.nameclient,
            price: req.body.price,
            cardNumberClient: req.body.cardNumberClient,
            nameHolder: req.body.nameHolder,
            expDate: req.body.expDate,
            cvv: req.body.cvv
        }


        let responseCielo = await cieloService.cieloServicePaymentCreditCard(payment)

        let pay = req.body

        let newPayment = await new mongoose.model('ExtractBuy')(pay)

        newPayment.idClient = user.userId
        newPayment.idFood = pay.idFood
        newPayment.idSalesman = pay.idSalesman
        newPayment.paymentId = responseCielo.payment.paymentId


        newPayment.save(async function (error, payment) {
            if (error) {
                res.send(error)
            } else {

                let food = ""
                food = await mongoose.model('Food').findOne({ _id: pay.idFood }).populate('owner');

                await mailService.sendMail(
                    food.owner[0].email,
                    'Novo Pedido', `
                Novo pedido: 
                <br> 
                <h4><strong>${food.nome}</strong></h4>
                <br> 
                <strong>Preço:</strong> ${payment.price} 
                <br> 
                <strong>Quantidade:</strong> ${payment.quantity}
                <br>
                <strong>Data do pedido:</strong> ${payment.dataCreated}
                <br>
                <strong>Status:</strong> ${payment.status}
                <br>
                <strong>Identificação do pagamento:</strong> ${payment.paymentId} 
                <br`)

                await mailService.sendMail(
                    user.user.email,
                    'Seu Pedido foi enviado', `
                    pedido: 
                    <br> 
                    <h4><strong>${food.nome}</strong></h4>
                    <br> 
                    <strong>Preço:</strong> ${payment.price} 
                    <br> 
                    <strong>Quantidade:</strong> ${payment.quantity}
                    <br>
                    <strong>Data do pedido:</strong> ${payment.dataCreated}
                    <br>
                    <strong>Identificação do pagamento:</strong> ${payment.paymentId} 
                    <br> `)

                    res.status(200).json({msg: "payment_authorized", code: "200"})
            }
        })
        
    }catch(error){
        res.status(200).json({msg: "payment_not_authorized", code: "400"})
    }



}

exports.consult = async function(req, res){
    try {
        var user = authController.authUserSalesman(req)
        
        let responseCielo = await cieloService.cieloServiceConsultPayment(req.body.paymentId)

        res.status(200).json(responseCielo)

    } catch (error) {
        res.status(200).json({msg: "error_when_consult_payment", code: "400"})
    }
}

exports.getPayments = async function (req, res) {
    try {
        var user = authController.authUserSalesman(req)

        let results = mongoose.model('ExtractBuy').find({ idClient: user.userId }, function (error, payment) {
            if (error)
                res.send(error)

            res.json({msg: "user_logged", code: 200, payment})
        }).populate('idClient').populate('idFood').populate('idSalesman')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.paymentSalesman = async function (req, res) {
    try {
        var user = authController.authUserSalesman(req)

        let results = mongoose.model('ExtractBuy').find({ idSalesman: user.userId }, null, { sort: { '_id': -1 } }, function (error, payment) {
            if (error)
                res.send(error)

            res.json(payment)
        }).populate('idClient').populate('idFood').populate('idSalesman')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.updatePaymentStatus = async function (req, res) {
    try {
        var user = authController.authUserSalesman(req)

        let statusBody = req.body.status

        let results = mongoose.model('ExtractBuy').findOneAndUpdate({ _id: req.params.id, idSalesman: user.userId }, { status: statusBody }, async function (error, payment) {
            if (error)
                res.send(error)

            await mailService.sendMail(
                payment.idClient[0].email,
                'Mudança de Status no pedido', `
                Status do Pedido: 
                <h3><strong style="color: red;">${payment.status}</strong></h3>
                    Pedido: 
                    <br> 
                    <h4><strong>${payment.idFood[0].nome}</strong></h4>
                    <br> 
                    <strong>Preço:</strong> ${payment.price} 
                    <br> 
                    <strong>Quantidade:</strong> ${payment.quantity}
                    <br>
                    <strong>Data do pedido:</strong> ${payment.dataCreated}`)

            res.json(payment)
        }).populate('idClient').populate('idFood').populate('idSalesman')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.getPaymentsPerStatus = async function(req, res){
    try {
        var user = authController.authUserSalesman(req)

        let results = mongoose.model('ExtractBuy').find({ idSalesman: user.userId, status: req.body.status }, null, { sort: { '_id': -1 } }, function (error, payment) {
            if (error)
                res.send(error)

            res.json(payment)
        }).populate('idClient').populate('idFood').populate('idSalesman')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}