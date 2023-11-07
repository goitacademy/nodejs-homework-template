const { contactsCtrlWrapper } = require("../../helpers");

const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavoriteContact = require("./updateFavoriteContact");

module.exports = {
  getAllContacts: contactsCtrlWrapper(getAllContacts),
  getContactById: contactsCtrlWrapper(getContactById),
  addContact: contactsCtrlWrapper(addContact),
  deleteContact: contactsCtrlWrapper(deleteContact),
  updateContact: contactsCtrlWrapper(updateContact),
  updateFavoriteContact: contactsCtrlWrapper(updateFavoriteContact),
};
