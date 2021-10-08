const DB_HOST = require("./config");
const mongoose = require("mongoose");

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connect success");
  })
  .catch((error) => {
    console.log(error.message);
  });
