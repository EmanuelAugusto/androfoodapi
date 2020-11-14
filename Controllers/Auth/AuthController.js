const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require("dotenv").config();

var mailService = require('../../Services/mailService')

exports.authUserSalesman = function (req) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        let decoded = JWT.verify(token, process.env.SECRET_KEY)

        return decoded
    } catch (error) {
        res.status(500).send({
            error: "error when get user"
        })
    }
}

exports.createAccountSalesman = function (req, res) {

    try {
        let user = req.body

        let newUser = '';
        let results = '';

        results = mongoose.model('Salesman').find({ email: user.email }, function name(error, tutors) {

            if (tutors.length) {
                res.status(400).send({ msg: "an account already exists with this registered email address" })
            } else {
                newUser = new mongoose.model('Salesman')(user)

                newUser.save(function (error, newUser) {

                    if (error) {
                        res.send(error)
                    } else {
                        let userId = newUser._id.toString()


                        mailService.sendMail(user.email, 'Conta Criada Com sucesso', 'Agradecemos a preferência pelo nosso serviço')

                        let dataUser = {
                            userId, user
                        }

                        const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
                            expiresIn: 7200
                        })

                        res.status(200).send({ dataUser })
                    }


                })

            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "error when create user"
        })
    }

}


exports.createAccountClient = function(req, res){
    
    try {
        let user = req.body

        let newUser = '';
        let results = '';

        results = mongoose.model('Client').find({ email: user.email }, function name(error, tutors) {

            if (tutors.length) {
                res.status(400).send({ msg: "an account already exists with this registered email address" })
            } else {
                newUser = new mongoose.model('Client')(user)

                newUser.save(function (error, newUser) {

                    if (error) {
                        res.send(error)
                    } else {
                        let userId = newUser._id.toString()


                        mailService.sendMail(user.email, 'Conta Criada Com sucesso', 'Agradecemos a preferência pelo nosso serviço')

                        let dataUser = {
                            userId, user
                        }

                        const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
                            expiresIn: 7200
                        })

                        res.status(200).send({ dataUser })
                    }


                })

            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "error when create user"
        })
    }
}




exports.loginAccountSalesman = async function (req, res) {

    try {
        const { email, passwordUser } = req.body;

        let user = ""
        user = await mongoose.model('Salesman').findOne({ email }).select("+password");

        if (user) {

            let { password } = user

            let verificationPassword = await bcrypt.compare(passwordUser, password);

            if (verificationPassword) {

                let userId = user._id.toString()

                let dataUser = {
                    userId, user
                }

                const token = await JWT.sign(dataUser, process.env.SECRET_KEY, {
                    expiresIn: 7200
                })

                res.status(200).send({ token, dataUser })

            } else {
                res.status(401).send({ msg: "username or password do not match" })
            }

        } else {
            res.status(404).send({ msg: "User not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "error when create user"
        })
    }

}

exports.loginAccountClient = async function(req, res){
    try {
        const { email, passwordUser } = req.body;

        let user = ""
        user = await mongoose.model('Client').findOne({ email }).select("+password");

        if (user) {

            let { password } = user

            let verificationPassword = await bcrypt.compare(passwordUser, password);

            if (verificationPassword) {

                let userId = user._id.toString()

                let dataUser = {
                    userId, user
                }

                const token = await JWT.sign(dataUser, process.env.SECRET_KEY, {
                    expiresIn: 7200
                })

                res.status(200).send({ token, dataUser })

            } else {
                res.status(401).send({ msg: "username or password do not match" })
            }

        } else {
            res.status(404).send({ msg: "User not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "error when create user"
        })
    }
}

exports.logout = function(req, res){

    try{
        const token = req.headers.authorization.split(' ')[1]
        
        let tokenUser = {
            token
        }

        let newBlacklistToken = new mongoose.model('Token')(tokenUser)

        newBlacklistToken.save(function(error, token){
            if(error)
                res.send(error)
    
            res.json({msg: "logout sucess"})
        }) 


    }catch(error){
        res.status(400).send({ msg : "token not sended"})
    }
    
}