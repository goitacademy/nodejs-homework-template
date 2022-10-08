// Пакет работы с MongoDB
const mongoose = require('mongoose');

// Что бы подключится к базе, и строка подключения к базе

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

// mongoose
//     .connect(DB_HOST)
//     .then(() => console.log('Database connection successful'))
//     .catch(error => console.log(error.message));

mongoose
    .connect(DB_HOST)
    .then(() =>
        app.listen(PORT, () => {
            console.log('Database connection successful');
        })
    )
    .catch(error => {
        console.log(error.message);
        // Закрывает все запущенные процессы на всякий  случай
        process.exit(1);
    });

// app.listen(3000, () => {
//     console.log('Server running. Use our API on port: 3000');
// });
