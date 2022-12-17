const getContacts = require("./getContacts");
const getContact = require("./getContactById");
const addNewContact = require("./addContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./updateContact");

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  changeContact,
};
