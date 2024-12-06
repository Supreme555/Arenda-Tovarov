const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,           // Имя базы данных
    process.env.DB_USER,           // Пользователь
    process.env.DB_PASSWORD,       // Пароль
    {
        host: process.env.DB_HOST, // Хост (обычно localhost)
        port: process.env.DB_PORT, // Порт (1600 в вашем случае)
        dialect: 'mssql',          // Используемый драйвер
        logging: false,            // Отключение логов SQL-запросов
        dialectOptions: {
            options: {
                encrypt: false,    // Шифрование (если требуется)
                trustServerCertificate: true // Используйте true, если нет SSL-сертификата
            }
        }
    }
);

module.exports = sequelize;
