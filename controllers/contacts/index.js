const contactsList = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  contactsList,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
