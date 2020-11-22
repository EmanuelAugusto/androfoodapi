const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const authController = require('../Auth/AuthController')


exports.searchSalesman = function (req, res) {
    try {
        mongoose.model('Salesman').find({ nameSalesman: { $regex: new RegExp(req.body.nameSalesman), $options: 'i' }, erased: 0 }, function (error, salesman) {
            if (error)
                res.send(error)

            res.json(salesman)
        })
    } catch (error) {
        res.json({ msg: "error when get salesman" })
    }

}


exports.getAllSalesman = function(req, res){
    try {
        mongoose.model('Salesman').find({ erased: 0 }, function (error, salesman) {
            if (error)
                res.send(error)

            res.json(salesman)
        })
    } catch (error) {
        res.json({ msg: "error when get salesman" })
    }
}

exports.profile = function(req, res){
    try {
        mongoose.model('Salesman').findOne({ _id: req.params.id, erased: 0 }, function (error, salesman) {
            if (error)
                res.send(error)

            res.json(salesman)
        })
    } catch (error) {
        res.json({ msg: "error when get salesman" })
    }
}