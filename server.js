const mongoose = require("mongoose");

const app = require('./app')

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
  .then(()=> app.listen(PORT, () => {
    console.log(`Підключилися до бази даних і слухаємо порт ${PORT}`)
  }))
  .catch(error => {
    console.log(error);
    process.exit(1);
  })