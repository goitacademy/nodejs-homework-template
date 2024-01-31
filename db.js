// const mongoose = require("mongoose");
// const { serverPort, mongoConnectionString } = require("./config");

// const connect = async () => {
//   try {
//     await mongoose.connect(mongoConnectionString);
//   } catch (error) {
//     console.log(error);
//     throw new Error("Database connection failed");
//   }
// };

// const disconnect = async () => {
//   try {
//     await mongoose.connect(mongoConnectionString);
//   } catch (error) {
//     console.log(error);
//     throw new Error("Cannot disconnect from database!");
//   }
// };

// module.exports = {
//   connect,
//   disconnect,
// };

// const mongoose = require("mongoose");
// const { mongoConnectionString } = require("./config");

// const connect = async () => {
//   try {
//     await mongoose.connect(mongoConnectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error(error);
//     throw new Error("Database connection failed");
//   }
// };

// const disconnect = async () => {
//   try {
//     await mongoose.disconnect();
//     console.log("Disconnected from database");
//   } catch (error) {
//     console.error(error);
//     throw new Error("Cannot disconnect from database!");
//   }
// };

// module.exports = {
//   connect,
//   disconnect,
// };
const mongoose = require("mongoose");
const { mongoConnectionString } = require("./config");

const connect = async () => {
  try {
    console.log("Attempting to connect to the database...");
    console.log("mongoConnectionString:", mongoConnectionString);

    await mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error("Database connection failed");
  }
};

module.exports = {
  connect,
};
