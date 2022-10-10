const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addNewContact = require("./addNewContact");
const removeContactById = require("./removeContactById");
const updateContactById = require("./updateContactById.js");
const updateFavorite = require("./udateFavorite");

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateFavorite,
};
