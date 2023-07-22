const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 5000 } = process.env;
// mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("PORT :>> ", PORT);
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  });
