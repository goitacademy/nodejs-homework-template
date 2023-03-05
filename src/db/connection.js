const mongoose = require("mongoose");
const { getConnectionURI } = require("./utils");

const connectMongo = async () => {
  mongoose.set("strictQuery", false);

  const uri = getConnectionURI();

  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      retryWrites: true,
      w: "majority",
    });
    console.info(`Successfully connected to the database`);
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

module.exports = connectMongo;
