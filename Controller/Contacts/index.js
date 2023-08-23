const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContact = require("./updateContacts");
const updateContactStatus = require("./updateContactStatus");
const removeContact = require("./removeContacts");
const { ctrlWrapper } = require("../../Middlewares");

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateContactStatus),
  removeContact: ctrlWrapper(removeContact),
};