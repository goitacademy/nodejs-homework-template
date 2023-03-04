const connectDb = require("./connection");
const { Contacts, User } = require("./schemas");

module.exports = {
  connectDb,
  Contacts,
  User,
};
