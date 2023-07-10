  
const app = require('./app')

const mongoose = require("mongoose"); // для роботи з MongoDB

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true); // т. як з наступної версії стане false
mongoose.connect(DB_HOST) // підключення до БД 
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1); // закриваємо запущені процеси, 1 - означає невідому помилку
  });
    


