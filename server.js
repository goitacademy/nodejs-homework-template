const mongoose = require("mongoose");

const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

// ----------------

// const DB_HOST = "mongodb+srv://Valentin:Suemz3HTR4lctpBw@cluster0.rektj99.mongodb.net/db-contacts?retryWrites=true&w=majority"

const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;


mongoose.connect(DB_HOST)
    
  .then(() => {
    app.listen(PORT)
  })                       // console.log("Database connection successful"));
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    })
