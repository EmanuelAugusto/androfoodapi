require("dotenv").config();
const cielo = require('cielo')


const { EnumBrands, EnumCardType, Cielo } = cielo

const cieloConst = {
    merchantId: process.env.MERCHANTID,
    merchantKey: process.env.MERCHANTKEY,
    //requestId: 'xxxxxxx', // Opcional - Identificação do Servidor na Cielo
    sandbox: true, // Opcional - Ambiente de Testes
    debug: true
}


const cieloService = new Cielo(cieloConst);


exports.cieloServicePaymentCreditCard = async function (payload) {

    return new Promise((resolve, reject) => {
        
        const { nameClient, price, cardNumberClient, cvv, nameHolder, expDate } = payload

        const vendaParams = {
            customer: {
                name: nameClient,
            },
            merchantOrderId: "2014111703",
            payment: {
                amount: price, // R$100,00
                creditCard: {
                    brand: EnumBrands.VISA,
                    cardNumber: cardNumberClient,
                    holder: nameHolder,
                    expirationDate: expDate,
                    SecurityCode: cvv
                },
                installments: 1,
                softDescriptor: "Banzeh",
                type: EnumCardType.CREDIT,
                capture: false,
            },
        }


        cieloService.creditCard.transaction(vendaParams)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })


}

exports.cieloServiceConsultPayment = async function (payload) {

    return new Promise((resolve, reject) => {
        const consultaParams = {
            paymentId: payload
        };
        
        cieloService.consult.paymentId(consultaParams)
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
    })

}