const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
