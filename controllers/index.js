const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const removeContact = require("./removeContact");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const { ctrlWrapper } = require("../helpers");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  removeContact: ctrlWrapper(removeContact),
  createContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
