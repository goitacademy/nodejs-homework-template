const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
mongoose.set("strictQuery", false);
dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.oog(error.message);
    process.exit(1);
  });
