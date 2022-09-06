const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connect successfully");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
