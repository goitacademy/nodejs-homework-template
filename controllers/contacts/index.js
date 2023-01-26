const getAllContacts = require("./getAllContacts.js");
const getContact = require("./getContact.js");
const createContact = require("./createContact.js");
const deleteContact = require("./deleteContact.js");
const updateContactById = require("./updateContactById.js");
const updateStatusContact = require("./updateStatusContact.js");

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
};
