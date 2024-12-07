const express = require('express');
const { getAvailableProducts, getAllProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/available', getAvailableProducts);
router.get('/', getAllProducts);

module.exports = router; 