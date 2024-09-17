const mongoose = require("mongoose");

const DBI_URI = process.env.DBI_URI;

mongoose
  .connect(DBI_URI)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
