const { Router } = require("express");

// MIDDLEARES
var salesmanMiddleware = require('../Middlewares/salesmanMiddleware')
var clientMiddleware = require('../Middlewares/clientMiddleware')

// CONTROLLERS
var AuthController = require('../Controllers/Auth/AuthController')
var foodController = require('../Controllers/Http/foodController')
var salesmanController = require('../Controllers/Http/salesmanController')
var paymentController = require('../Controllers/Http/paymentController')

const Route = Router()

Route.get('/', function(req, res){
    res.status(200).json("androapi")
})
// Auth
Route.post('/createSalesman', AuthController.createAccountSalesman)
Route.post('/createClient', AuthController.createAccountClient)

Route.post('/loginSalesman', AuthController.loginAccountSalesman)
Route.post('/loginClient', AuthController.loginAccountClient)

// Route.get('/meSalesman',salesmanMiddleware.session, AuthController.meAccountSalesman)
// Route.get('/meClient', clientMiddleware.session,  AuthController.meAccountClient)

Route.post('/logout', AuthController.logout)

// end Auth

// //foods salesman
Route.post('/food', salesmanMiddleware.session, foodController.createFood)
Route.get('/food', salesmanMiddleware.session, foodController.getFoodsalesman)
Route.put('/food/:id', salesmanMiddleware.session, foodController.updateFood)
Route.delete('/food/:id', salesmanMiddleware.session, foodController.deleteFood)

// All foods user not Authenticated
Route.get('/allfood', foodController.getAllfood)
Route.get('/food/:id', foodController.getFoodById)
Route.post('/searchfood', foodController.searchAllfood)
Route.post('/searchsalesman', salesmanController.searchSalesman)

Route.get('/allsalesman', salesmanController.getAllSalesman)
Route.get('/foodsbysalesman/:id',  foodController.foodBySalesman)
Route.get('/salesman/:id', salesmanController.profile)


//Routes user Authenticated
Route.post('/payment', clientMiddleware.session, paymentController.paymentFood)
Route.get('/payments', clientMiddleware.session, paymentController.getPayments)

Route.get('/paymentSalesman', salesmanMiddleware.session, paymentController.paymentSalesman)
Route.put('/updatePaymentStatus/:id', salesmanMiddleware.session, paymentController.updatePaymentStatus)
Route.get('/getPaymentsPerStatus', salesmanMiddleware.session, paymentController.getPaymentsPerStatus)


module.exports = Route

