const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect("mongodb+srv://Julia:b8szHQtHs3CuijW4@cluster0.gmxyttk.mongodb.net/")
  .then(() =>
    app.listen(3000, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
