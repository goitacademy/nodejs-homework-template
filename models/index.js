const { Contact, contactJoiSchemas } = require("./contacts");
const { User, usersJoiSchemas } = require("./users");
const { UserSocial, usersSocialJoiSchemas } = require("./usersSocial");

module.exports = {
  Contact,
  User,
  UserSocial,
  contactJoiSchemas,
  usersJoiSchemas,
  usersSocialJoiSchemas,
};
