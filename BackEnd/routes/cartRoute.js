const express = require('express');
const { addRemoveToCart,getCart ,removeCartItem} = require('../controllers/cartController');
const router = express.Router();
const {authMiddleware} = require('../middleware/auth')

router.post('/addRemove' , authMiddleware , addRemoveToCart)

router.get('/get' , authMiddleware , getCart)

router.post('/remove' , authMiddleware , removeCartItem)

module.exports = router