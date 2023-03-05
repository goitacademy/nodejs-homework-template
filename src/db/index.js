const connectMongo = require("./connection");
const Contacts = require("./schema");
const getConnectionURI = require("./utils");

module.exports = {
  connectMongo,
  Contacts,
  getConnectionURI,
};
