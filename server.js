const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

// коли приєднались до бази тоді запускаєм сервер
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful');
    })
  )
  .catch(error => {
    console.log(error);
    process.exit(1); // 1-це необроблена помилка
  });
