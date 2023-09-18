const mongoose = require("mongoose");
const app = require("./app");
const PORT = 3000;

require("dotenv").config();

const uriDb = process.env.MONGODB_CONNECTION_STRING;

const runServer = async () => {
  try {
    const connection = await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection run");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}. Use your API.`);
    });
  } catch (error) {
    console.log("Cannot connect to Mongo Database");
    console.log(error);
    process.exit(1);
  }
};

runServer();
