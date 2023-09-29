require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;
const mongoose = require("mongoose");

mongoose
  .connect(DATABASE_URI, { dbName: "mydb" })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  });

