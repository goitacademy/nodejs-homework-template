const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then((connection) => {
//     console.log("Database connection successful!");
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });
