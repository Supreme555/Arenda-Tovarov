const { Op } = require('sequelize');
const Rental = require('../models/Rental');
const Product = require('../models/Product');
const User = require('../models/User');
const sequelize = require('../config/db');

exports.rentProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        console.log('Попытка аренды:', req.body);
        const { user_id, product_id, rental_start, rental_end } = req.body;

        // Проверяем доступность продукта
        const product = await Product.findByPk(product_id, { transaction });
        
        if (!product) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Продукт не найден' });
        }

        if (product.quantity <= 0) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Продукт недоступен для аренды' });
        }

        // Уменьшаем количество доступных продуктов
        await product.decrement('quantity', { by: 1, transaction });

        // Создаем запись об аренде
        const rental = await Rental.create({
            user_id,
            product_id,
            rental_start,
            rental_end,
            status: 'active'
        }, { transaction });

        await transaction.commit();
        res.status(201).json(rental);

    } catch (err) {
        await transaction.rollback();
        console.error('Ошибка при аренде:', err);
        res.status(500).json({ 
            message: 'Ошибка при создании аренды',
            error: err.message 
        });
    }
};

exports.getUserRentals = async (req, res) => {
    try {
        const { userId } = req.params;
        const rentals = await Rental.findAll({
            where: { user_id: userId },
            include: [Product]
        });
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.returnProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        console.log('Попытка возврата:', req.body);
        const { rental_id } = req.body;
        
        const rental = await Rental.findByPk(rental_id, { transaction });

        if (!rental || rental.status !== 'active') {
            await transaction.rollback();
            return res.status(400).json({ message: 'Аренда не найдена или уже завершена' });
        }

        // Обновляем статус аренды
        rental.status = 'returned';
        await rental.save({ transaction });

        // Увеличиваем количество доступных продуктов
        const product = await Product.findByPk(rental.product_id, { transaction });
        if (product) {
            await product.increment('quantity', { by: 1, transaction });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Товар успешно возвращен' });

    } catch (err) {
        await transaction.rollback();
        console.error('Ошибка при возврате:', err);
        res.status(500).json({ 
            message: 'Ошибка при возврате товара',
            error: err.message 
        });
    }
};

exports.autoExtendRentals = async (req, res) => {
    try {
        const { days = 1 } = req.body; // Получаем количество дней из запроса
        const expiredRentals = await Rental.findAll({
            where: {
                status: 'active',
                rental_end: { [Op.lt]: new Date() },
            },
        });

        for (const rental of expiredRentals) {
            const newRentalEnd = new Date(rental.rental_end);
            newRentalEnd.setDate(newRentalEnd.getDate() + Number(days));
            rental.rental_end = newRentalEnd;
            await rental.save();
        }

        res.status(200).json({ 
            message: `Аренды продлены на ${days} ${days === 1 ? 'день' : 'дней'}` 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.extendRental = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { rental_id, days } = req.body;
        
        const rental = await Rental.findByPk(rental_id, { transaction });

        if (!rental || rental.status !== 'active') {
            await transaction.rollback();
            return res.status(400).json({ message: 'Аренда не найдена или не активна' });
        }

        const newRentalEnd = new Date(rental.rental_end);
        newRentalEnd.setDate(newRentalEnd.getDate() + Number(days));
        rental.rental_end = newRentalEnd;
        await rental.save({ transaction });

        await transaction.commit();
        res.status(200).json({ 
            message: `Аренда продлена на ${days} ${days === 1 ? 'день' : 'дней'}`,
            rental 
        });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: err.message });
    }
};

exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                },
                {
                    model: Product,
                    attributes: ['name', 'price_per_day']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(rentals);
    } catch (err) {
        console.error('Ошибка при получении всех аренд:', err);
        res.status(500).json({ 
            message: 'Ошибка при получении списка аренд',
            error: err.message 
        });
    }
};
