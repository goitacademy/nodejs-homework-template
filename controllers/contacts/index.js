const { deleteContact } = require("./deleteContact");
const { createContact } = require("./createContact");
const { getContact } = require("./getContact");
const { getListOfContacts } = require("./getListOfContacts");
const { editContact } = require("./editContact");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  getListOfContacts,
  getContact,
  deleteContact,
  createContact,
  editContact,
  updateStatusContact,
};
