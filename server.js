const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = async () => {
  try {
    const mongooseOptions = {
      // useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.URI_DATABASE, mongooseOptions);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port ${PORT}`);
    });
  } catch (error) {
    console.error("Cannot connect to database");
    console.log(error);
    process.exit(1);
  }
};

server();