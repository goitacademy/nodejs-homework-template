const { connect } = require("mongoose");

const connectingDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await connect(mongoURI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectingDB;
