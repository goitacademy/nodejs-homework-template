const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Patrikonn:Nazar3578@cluster0.d8ov9vl.mongodb.net/db-contacts";
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
