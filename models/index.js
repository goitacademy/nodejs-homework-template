const {
  Contact,
  addContactSchema,
  updateContactSchema,
} = require("./contactModel");
const { User, schemas } = require("./userModel");

module.exports = {
  Contact,
  User,
  schemas,
  addContactSchema,
  updateContactSchema,
};
