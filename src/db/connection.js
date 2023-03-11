const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

const connectMongo = async () => {
  try {
    const uri = getConnectionURI();
    await mongoose.connect(uri, { useUnifiedTopology: true });
    console.log("Database connection successful");
  } catch (error) {
    console.error(`Failed to connect to database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMongo;
