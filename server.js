const mongoose = require("mongoose");

// const DB_HOST =
//   "mongodb+srv://MaryDan:4W3dbq1I6FNwX1DA@cluster0.0qilsj8.mongodb.net/phonebook?retryWrites=true&w=majority";
const app = require("./app");

// console.log(process.env.DB_HOST);

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// 4W3dbq1I6FNwX1DA
