
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/product', orderController.orderInsert);
router.get('/product_buy', orderController.getDataOrder);



module.exports = router;
