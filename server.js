const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set(`strictQuery`, true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(DB_HOST);
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//! === ver.2 ===

// const mongoose = require("mongoose");
// const app = require("./app");

// const { DB_HOST } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log(DB_HOST);
//     console.log("Database connection successful");
//     app.listen(3000);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
