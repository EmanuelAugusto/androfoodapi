const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require("dotenv").config();



exports.session = function (req, res, next) {
    try {
        const tokenRequest = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

        if (!tokenRequest) {
            res.status(401).send({ message: 'invalid session' })
        }


        let result = mongoose.model('Token').find({ token: { $regex: new RegExp(tokenRequest), $options: 'i' } }, function (error, token) {
            if (error)
                res.send(error)

            if (token.length) {
                res.status(401).send({ message: 'token blacklisted' })
            } else {
                JWT.verify(tokenRequest, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        console.log(err)
                        res.status(401).send({ message: 'invalid session' })
                    } else {
                        req.data = decoded

                        if (decoded.user.typeProfile != "salesman") {
                            res.status(401).send({ message: 'You are not a salesman' })
                        } else {
                            next()
                        }
                    }

                })
            }

        })

    } catch (error) {
        res.status(500).send({
            error: "error when pass in middleware"
        })
    }

}

