const { getContacts } = require("./getContacts");
const { getContactById } = require("./getContactById");
const { deleteContact } = require("./deleteContact");
const { createContact } = require("./createContact");
const { updateContact } = require("./updateContact");
const { updateStatus } = require("./updateStatus");

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatus,
};
