const { ctrlWrapper } = require("../../helpers");
const getAllContacts = require("./getAllContacts");
const getContactsById = require("./getContactsById");
const addContact = require("./addContact");
const removeContactById = require("./removeContactById");
const updateContactById = require("./updateContactById");
const updateFavoriteContact = require("./updateFavoriteContact");

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
