const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const removeContactById = require("./removeContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFavorite,
};