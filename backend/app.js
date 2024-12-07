require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const productRoutes = require('./routes/productRoutes');

// Проверка подключения к базе данных
sequelize.authenticate()
    .then(() => {
        console.log('Соединение с базой данных установлено успешно.');
    })
    .catch((err) => {
        console.error('Не удалось подключиться к базе данных:', err.message);
    });

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:5173', // Укажите адрес вашего фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
}));

// Парсер JSON
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api/users', userRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/products', productRoutes);

// Синхронизация базы данных и запуск сервера
sequelize.sync()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    })
    .catch(err => console.error('Ошибка синхронизации с базой данных:', err));
