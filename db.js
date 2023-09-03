// const mongoose = require("mongoose");

// const DB_URI = process.env.DB_URI;

// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("Database connection succesfull"))
//     .catch((error) => console.error(error));

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); 
  });