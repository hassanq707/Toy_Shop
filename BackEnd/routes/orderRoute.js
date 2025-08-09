const express = require('express');
const { placeOrder,verifyOrder,userOrders,listOrders,updateStatus} = require('../controllers/orderController');
const router = express.Router();
const {authMiddleware} = require('../middleware/auth')

router.post('/place' , authMiddleware , placeOrder)

router.post('/verify' , verifyOrder)

router.get('/userorders' , authMiddleware , userOrders)

router.get('/listorders', listOrders)

router.post('/status', updateStatus)


module.exports = router