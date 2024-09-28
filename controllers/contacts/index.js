const { getAllContacts } = require("./getAllContacts");
const { getContactsById } = require("./getContactsById");
const { addContact } = require("./addContact");
const { removeContactById } = require("./removeContactById");
const { updateContactById } = require("./updateContactById");
const { updateFavoriteContact } = require("./updateFavoriteContact");

module.exports = {
  getAllContacts,
  getContactsById,
  addContact,
  removeContactById,
  updateContactById,
  updateFavoriteContact,
};
