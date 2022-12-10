const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection is successfull");
    app.listen(PORT);
    console.log(`Server is runing. Use your API on port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
