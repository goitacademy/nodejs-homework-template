require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {})
  // mongodb+srv://dbuser:12345@cluster0.tmfwdxi.mongodb.net/db-contacts?retryWrites=true&w=majority
  .then(() => {
    console.log("Database connection successful");

    const app = require("./app");
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });
