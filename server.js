const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.set("strictQuery", true);

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT, console.log("Database connection successful")))
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
