const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/list', menuController.list);

module.exports = router;
