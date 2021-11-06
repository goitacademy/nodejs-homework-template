const listContacts = require("./getAll");
const getContactById = require("./getById");
const removeContact = require("./remove");
const addContact = require("./add");
const updateContactById = require("./updateById");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
