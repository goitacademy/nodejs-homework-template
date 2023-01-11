const { mongoConnect } = require("./connection");
const { Contact } = require("./contactModel");
const { User } = require("./userModel");

module.exports = {
  mongoConnect,
  Contact,
  User,
};
