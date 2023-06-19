const mongoose = require("mongoose");
const app = require("./app");

const { MONGO_URL } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
