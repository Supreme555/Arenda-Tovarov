const express = require('express');
const { rentProduct, returnProduct, autoExtendRentals } = require('../controllers/rentalController');

const router = express.Router();

router.post('/rent', rentProduct);
router.post('/return', returnProduct);
router.post('/auto-extend', autoExtendRentals);

module.exports = router;
