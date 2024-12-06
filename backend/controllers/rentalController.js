const Rental = require('../models/Rental');
const Product = require('../models/Product');

exports.rentProduct = async (req, res) => {
    try {
        const { user_id, product_id, rental_start, rental_end } = req.body;
        const product = await Product.findByPk(product_id);

        if (!product || product.quantity <= 0) {
            return res.status(400).json({ message: 'Товар недоступен для аренды' });
        }

        await sequelize.transaction(async (t) => {
            product.quantity -= 1;
            await product.save({ transaction: t });

            await Rental.create({ user_id, product_id, rental_start, rental_end }, { transaction: t });
        });

        res.status(201).json({ message: 'Товар успешно арендован' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.returnProduct = async (req, res) => {
    try {
        const { rental_id } = req.body;
        const rental = await Rental.findByPk(rental_id);

        if (!rental || rental.status !== 'active') {
            return res.status(400).json({ message: 'Аренда не найдена или уже завершена' });
        }

        rental.status = 'returned';
        await rental.save();

        const product = await Product.findByPk(rental.product_id);
        if (product) {
            product.quantity += 1;
            await product.save();
        }

        res.status(200).json({ message: 'Товар успешно возвращен' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.autoExtendRentals = async (req, res) => {
    try {
        const expiredRentals = await Rental.findAll({
            where: {
                status: 'active',
                rental_end: { [Op.lt]: new Date() },
            },
        });

        for (const rental of expiredRentals) {
            const newRentalEnd = new Date(rental.rental_end);
            newRentalEnd.setDate(newRentalEnd.getDate() + 1);
            rental.rental_end = newRentalEnd;
            await rental.save();
        }

        res.status(200).json({ message: 'Продление выполнено' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
