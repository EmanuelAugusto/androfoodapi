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
            msg: "error_when_get_user"
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
                res.status(200).send({ msg: "an account already exists with this registered email address" })
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

                        res.status(200).send({ msg: "Account Created", dataUser })
                    }


                })

            }

        })
    } catch (error) {
        res.status(500).send({
            msg: "error when create user"
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
                res.status(200).send({ msg: "already_exists_registered_email_address", code: "400" })
            } else {
                newUser = new mongoose.model('Client')(user)

                newUser.save(function (error, newUser) {

                    if (error) {
                        res.send({ msg: "Incomplete_data", code: "400" })
                    } else {
                        let userId = newUser._id.toString()


                        mailService.sendMail(user.email, 'Conta Criada Com sucesso', 'Agradecemos a preferência pelo nosso serviço')

                        let dataUser = {
                            userId, user
                        }

                        const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
                            expiresIn: 7200
                        })

                        res.status(200).send({msg: "Account_Created", code: "200", dataUser })
                    }


                })

            }

        })
    } catch (error) {
        res.status(500).send({
            msg: "error when create user"
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
        res.status(500).send({
            msg: "error when create user"
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

                res.status(200).send({msg: "user_logged", code: "200", token, dataUser })

            } else {
                res.status(200).send({ msg: "password_do_not_match", code: "401", })
            }

        } else {
            res.status(200).send({ msg: "user_not_found", code: "404" })
        }
    } catch (error) {
        res.status(200).send({
            msg: "error when login user",
            code: "500"
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
        res.status(200).send({ msg : "token_not_sended"})
    }
    
}

exports.me = async function(req, res){
    try{
        const token = req.headers.authorization.split(' ')[1]

        await JWT.verify(token, process.env.SECRET_KEY, async (err, dataUser) => {
            if (err) {
              res.status(200).send({ msg : "token_not_sended", code: "401" })
            }

            let { userId } = { ...dataUser }

        
              userModel = mongoose.model('Client').findOne({ _id: userId }, function (error, user) {
                if (error) {
                  res.status(500).json({ error })
                } else {
        
                  let userId = user._id.toString()
        
                  dataUser = {
                    userId, user
                  }
        
        
                  res.status(200).json({msg: "user_logged", code: "200", dataUser })
                }
        
              })
        
          })

    }catch(error){
        res.status(200).send({
            msg: "error_when_get_user",
            code: "500"
        })
    }
}