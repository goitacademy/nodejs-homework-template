/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContact,
};
