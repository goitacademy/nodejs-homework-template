const { createContact } = require("./createContact.js");
const { getAllContacts } = require("./getAllContacts.js");
const { getContactById } = require("./getContactById.js");
const { removeContact } = require("./removeContact.js");
const { updateContact } = require("./updateContact.js");
const { updateFavorite } = require("./updateFavorite.js");

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
  updateFavorite,
};
