const contactsList = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");

module.exports = {
  contactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
