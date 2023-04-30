const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

dotenv.config();

const PORT = 3000;

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connecting to MongoDB..."));
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log("Server not working. Error: " + error);
    process.exit(1);
  });
