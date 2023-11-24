const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.info("Datebase conection successfully"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
