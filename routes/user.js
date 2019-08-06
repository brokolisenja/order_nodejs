
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/list', userController.list);
router.get('/list-datatable', userController.listDatatable);
router.post('/insert', userController.insert);

module.exports = router;
