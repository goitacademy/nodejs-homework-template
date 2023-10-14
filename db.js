const mongoose = require("mongoose");
const { mongoConnectionSitring } = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionSitring);
  } catch (e) {
    console.error(e);
    throw new Error("Data connection failed");
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
    throw new Error("Disconnect failed");
  }
};
module.exports = {
  connect,
  disconnect,
};
