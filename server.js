const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Konstantin:2UGRxz8sNazMmcHV@cluster0.ughzkxg.mongodb.net/";
// const DB_HOST = 'mongodb+srv://Konstantin:2UGRxz8sNazMmcHV@cluster0.ughzkxg.mongodb.net/db-contacts'

// mongoose.set('strictQuery', true);

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
