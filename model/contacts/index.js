const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContactById = require("./removeContactById");
const updateContacts = require("./updateContacts");
const updateContactById = require("./updateContactById");

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContacts,
  updateContactById,
};
