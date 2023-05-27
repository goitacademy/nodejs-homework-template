require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const { DB_URI, PORT = 3030 } = process.env;

(async () => {
  try {
    await mongoose.connect(DB_URI);

    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
})();
