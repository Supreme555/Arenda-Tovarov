const express = require('express');
const { rentProduct, getUserRentals, returnProduct, getAllRentals, autoExtendRentals, extendRental } = require('../controllers/rentalController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Защищенные маршруты
router.use(authenticateToken);

// Маршруты доступные всем авторизованным пользователям
router.post('/rent', rentProduct);
router.post('/return', returnProduct);
router.get('/user/:userId', (req, res, next) => {
    // Проверяем, что пользователь запрашивает свои аренды или является админом
    if (req.user.role !== 'admin' && req.params.userId != req.user.userId) {
        return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
}, getUserRentals);

// Маршруты только для админов
router.get('/', isAdmin, getAllRentals);
router.post('/auto-extend', isAdmin, autoExtendRentals);
router.post('/extend', isAdmin, extendRental);

module.exports = router;
