const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
