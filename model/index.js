/* eslint-disable semi */
/* eslint-disable quotes */
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const updateListContacts = require("./updateListContacts");
const removeContact = require("./removeContact");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");

module.exports = {
  listContacts,
  getContactById,
  updateListContacts,
  removeContact,
  addContact,
  updateContactById,
};
