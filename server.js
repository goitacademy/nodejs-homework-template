const app = require('./app')
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})()

