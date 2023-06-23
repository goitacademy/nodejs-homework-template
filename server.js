const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

// live server: https://nodejs-homework-rest-api-34tv.onrender.com/api/contacts

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running and connected to DB");
      console.log("live server: https://nodejs-homework-rest-api-34tv.onrender.com/api/contacts");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
