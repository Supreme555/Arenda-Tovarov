const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { 
                userId: user.user_id,
                role: user.role 
            },
            process.env.SECRET_KEY || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
