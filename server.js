const app = require("./app");
const mongoose = require("mongoose");

// mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false);//Artem

const {DB_HOST, PORT = 3000} = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  }); 
