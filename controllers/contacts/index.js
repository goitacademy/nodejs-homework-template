const { ctrlWrapper } = require("../../helpers");

const getContactsList = require("./getContactsList");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");
const deleteContact = require("./deleteContact");

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactStatus: ctrlWrapper(updateContactStatus),
  deleteContact: ctrlWrapper(deleteContact),
};
