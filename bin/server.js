const app = require('../app');
const mongoose = require('mongoose');


const PORT = 3000
const DB_HOST = "mongodb+srv://Vitalii:Fy420295@cluster0.d4bri3o.mongodb.net/db-contacts?retryWrites=true&w=majority"

// const {DB_HOST, PORT = 3000} = process.env;

// console.log(process.env)

mongoose
    .connect(DB_HOST)
    .then(app.listen(PORT, () => console.log('Database connection successful')))
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });


