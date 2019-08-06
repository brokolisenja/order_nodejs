
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/insert_product', productController.productInsert);
router.post('/update_product', productController.productUpdate);
router.delete('/delete_product/:id', productController.productDelete);
router.get('/product_all', productController.productGetData);


module.exports = router;
