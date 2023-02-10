const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const addContact = require("./addContact");
const changeContact = require("./changeContact");
const updateStatus = require("./updateStatus");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  updateStatus,
};