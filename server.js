const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
const path = require("path");
const Contact = require("./models/ContactsModel");
const configPath = path.join(__dirname, ".", "config", ".env");

console.log(Contact);

dotenv.config({ path: configPath });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", require("./routes/api/contacts"));

const main = async () => {
  try {
    if (!process.env.HOST_URL) {
      throw new Error("HOST_URL not set!");
    }

    await mongoose.connect(process.env.HOST_URL);
    mongoose.connect(process.env.HOST_URL);

    console.log("Database connection successful");

    app.listen(process.env.PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Server not running. Error:", error.message);
    process.exit(1);
  }
};

main();
