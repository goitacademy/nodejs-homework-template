const { createContact } = require("./createContact");
const { getContactById } = require("./getContactById");
const { getContacts } = require("./getContacts");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");

module.exports = {
  createContact,
  getContactById,
  getContacts,
  removeContact,
  updateContact,
};
