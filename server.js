const app = require("./app");
const mongoose = require("mongoose");

// mongoose.set('strictQuery', true);
const {DB_HOST} = require('./config')

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  }); 
