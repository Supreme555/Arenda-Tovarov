const { Op } = require('sequelize');
const Product = require('../models/Product');

exports.getAvailableProducts = async (req, res) => {
    try {
        console.log('Запрос на получение доступных продуктов');
        const products = await Product.findAll({
            where: {
                quantity: {
                    [Op.gt]: 0
                }
            }
        });
        console.log('Найденные продукты:', products);
        res.json(products);
    } catch (err) {
        console.error('Ошибка при получении продуктов:', err);
        res.status(500).json({ 
            error: err.message,
            stack: err.stack 
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 