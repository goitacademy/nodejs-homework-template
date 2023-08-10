const app = require('./app')

const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;


mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful")
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(`Database connection failed. Error message: ${error.message}`);
    process.exit(1);
  });
