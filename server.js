const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { HOST_URL } = process.env;

dotenv.config();
mongoose.set("strictQuery", true);
mongoose.set("debug", true);

const main = async () => {
  try {
    await mongoose.connect(HOST_URL);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.err("Error while connecting to mongodb", err.message);
    process.exit(1);
  }
};

main();

// Mongodb
// log = kolesnik2405;
// KEY = jmDwjjHcezaPQZXn;
