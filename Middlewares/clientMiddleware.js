const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require("dotenv").config();



exports.session = function (req, res, next) {
    try {
        const tokenRequest = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

        if (!tokenRequest) {
            res.status(200).send({msg: "invalid_session", code: "401"})
            return;
        }


        let result = mongoose.model('Token').find({ token: { $regex: new RegExp(tokenRequest), $options: 'i' } }, function (error, token) {
            if (error)
                res.send(error)

            if (token.length) {
                res.status(200).send({ msg: 'token_blacklisted', code: "401" })
            } else {
                JWT.verify(tokenRequest, process.env.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        res.status(200).send({ msg: 'invalid_session', code: "401" })
                    } else {
                        req.data = decoded

                        if (decoded.user.typeProfile != "client") {
                            res.status(200).send({ msg: 'not_a_client', code: "401" })
                        } else {
                            next()
                        }
                    }

                })
            }

        })

    } catch (error) {
        res.status(200).send({
            msg: "error_get_token",
            code: "500"
        })
    }

}

