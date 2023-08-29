const mongoose = require("mongoose");

const app = require("./app");

const { DB_URI, PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
