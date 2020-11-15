const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const authController = require('../Auth/AuthController')


exports.getAllfood = async function (req, res) {
    try {
        let foods;
        foods = await mongoose.model('Food').find({ erased: 0 }, null, { sort: { '_id': -1 }}).populate('owner');

        res.json(foods)

    } catch (error) {
        res.status(500).json(error.toString())
    }

}

exports.createFood = function (req, res) {
    try {
        var user = authController.authUserSalesman(req)

        let newFood = new mongoose.model('Food')(req.body)
        newFood.idSalesman = user.userId
        newFood.owner = user.userId

        newFood.save(function (error, foods) {
            if (error)
                res.send(error)

            res.json(foods)
        })

    } catch (error) {
        res.status(500).json(error.toString())
    }

}


exports.getFoodsalesman = function (req, res) {
    try {
        var user = authController.authUserSalesman(req)

        let results = mongoose.model('Food').find({ idSalesman: user.userId, erased: 0 }, function (error, pets) {
            if (error)
                res.send(error)

            res.json(pets)
        }).populate('owner')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}


exports.updateFood = function (req, res) {
    try {

        let user = authController.authUserSalesman(req)

        let food = req.body

        let results = mongoose.models.Pet.findOneAndUpdate({ _id: req.params.id, idSalesman: user.userId },
            food,
            function (error, foods) {
                if (error)
                    res.send(error)

                res.json({ msg: "update success" })
            })
    } catch (error) {
        res.json({ msg: "error when update foods" })
    }
}

exports.deleteFood = function (req, res) {
    try {
        let user = authController.authUserSalesman(req)

        let results = mongoose.model('Food').findOneAndUpdate({ _id: req.params.id, idSalesman: user.userId },
            { erased: 1 },
            function (error, food) {
                if (error)
                    res.send(error)

                res.json({ msg: "delete success" })
            })
    } catch (error) {
        res.json({ msg: "error when delete foods" })
    }
}

exports.getFoodById = function (req, res) {
    try {

        let results = mongoose.model('Food').findOne({ _id: req.params.id, erased: 0 }, function (error, foods) {
            if (error)
                res.send(error)

            res.json(foods)
        }).populate('owner')
    } catch (error) {
        console.log(error)
        res.json({ msg: "error when get foods" })
    }
}

exports.searchAllfood = function (req, res) {
    try {
        mongoose.model('Food').find({ nome: { $regex: new RegExp(req.body.nameFood), $options: 'i' }, erased: 0 }, function (error, Loja) {
            if (error)
                res.send(error)

            res.json(Loja)
        }).populate('owner')
    
        
    } catch (error) {
        console.log(error)
        res.json({ msg: "error when get foods" })
    }

}

exports.foodBySalesman = function(req, res){
    try {

        let results = mongoose.model('Food').find({ owner: req.params.id, erased: 0 }, function (error, foods) {
            if (error)
                res.send(error)

            res.json(foods)
        }).populate('owner')
    } catch (error) {
        res.status(500).json(error.toString())
    }
}