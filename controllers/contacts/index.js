const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const addContacts = require("./addContacts");
const deleteContacts = require("./deleteContacts");
const updateContacts = require("./updateContacts");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllContacts,
  getById,
  addContacts,
  deleteContacts,
  updateContacts,
  updateStatusContact,
};