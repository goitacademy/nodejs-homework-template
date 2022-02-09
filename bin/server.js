const app = require("../app");

const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST } = process.env;
// const PORT = process.env.PORT || 3000;
// const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
