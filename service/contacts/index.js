const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");
const addContact = require("./addContact");


module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};