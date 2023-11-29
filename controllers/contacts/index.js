const { ctrlWrapper } = require("../../helpers");

const listContacts = require("./listContacts");
const removeContacts = require("./removeContact");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const addContact = require("./addContact");

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  removeContacts: ctrlWrapper(removeContacts),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  addContact: ctrlWrapper(addContact),
};
