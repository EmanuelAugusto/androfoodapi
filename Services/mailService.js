const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async function (email, title, message) {

    return new Promise(async (resolve, reject) => {

        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MIMO_PET_GMAIL_DEV,
                pass: process.env.MIMO_PET_GMAIL_PASSWORD_DEV
            }
        });


        var mailOptions = {
            from: process.env.MIMO_PET_GMAIL_DEV,
            to: email,
            subject: title,
            html: message
        };

        await mail.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject('error')
            } else {
                resolve('sucess')
            }
        });

    })

}