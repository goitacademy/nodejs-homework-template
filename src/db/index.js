const connectMongo = require("./connection");
const Contacts = require("./contactsSchema");
const getConnectionURI = require("./utils");

module.exports = {
  connectMongo,
  Contacts,
  getConnectionURI,
};
