const getAll = require("./getContacts");
const getById = require("./getContactById");
const add = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");

module.exports = {
  getAll,
  add,
  removeContact,
  getById,
  updateContact,
};
