const getListContacts = require("./getListContacts");
const getContact = require("./getContact");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  createContact,
  deleteContact,
  getListContacts,
  getContact,
  updateContactById,
  updateStatusContact,
};