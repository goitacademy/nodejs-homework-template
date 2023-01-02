const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const { DB_HOST, PORT = 3000 } = process.env;
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));
app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
