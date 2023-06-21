const { ctrlWrapper } = require("../../Helpers");

const { listContacts } = require("../contacts/listContacts");
const { getContactById } = require("../contacts/getContactById");
const { addContact } = require("../contacts/addContact");
const { removeContact } = require("../contacts/removeContact");
const { updateContact } = require("../contacts/updateContact");
const { updateFavorite } = require("../contacts/updateFavorite");

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
