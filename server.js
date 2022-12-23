const mongoose = require("mongoose");

const app = require('./app')

// const { lineBreak } = require("./service")



//----------------------------------------------------------------
// const DB_HOST = "mongodb+srv://Ruslan:SiaLzikXKL7dkvK2@cluster379.kq6zkfp.mongodb.net/db-contacts?retryWrites=true&w=majority"
// const PORT = 3000

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT))
  // .then(() => lineBreak())
  .then(() => console.log(`Server is running on the port: ${PORT}`.bgGreen.red))
  .then(() => console.log("Database connection successful"))
  // .then(() => lineBreak())
  .catch(error => {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  });


