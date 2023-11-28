const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.info({ DB_URI }, "Database connection successfully"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
