const { mongoConnect } = require("./connection");
const { Contact } = require("./contactModel");

module.exports = {
  mongoConnect,
  Contact,
};
