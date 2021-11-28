/* eslint-disable semi */
/* eslint-disable quotes */
const app = require("../app");
const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST } = process.env;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
