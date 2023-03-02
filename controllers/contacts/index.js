const getAllContacts = require("./getAllContacts");
const getContactId = require("./getContactId");
const addContact = require("./addContact");
const putContacts = require("./putContacts");
const deleteContact = require("./deleteContact");
const updateContact = require("./patchContact");

module.exports = {
  getAllContacts,
  getContactId,
  addContact,
  putContacts,
  deleteContact,
  updateContact,
};
