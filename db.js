const mongoose = require("mongoose");
const { mongoConnectionString } = require("./config");

// Przykład własnej klasy błędu

// class DatabaseConnectionError extends Error {
//     constructor() {
//         super('Database connection failed');
//     }
// }

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (e) {
    console.error(e);

    throw new Error("Database connection failed");
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
    throw new Error("Cannot disconnect from database!");
  }
};

module.exports = {
  connect,
  disconnect,
};
