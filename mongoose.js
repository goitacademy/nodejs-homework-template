const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
