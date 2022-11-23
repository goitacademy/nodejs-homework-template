const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateById = require("./updateById");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  updateFavorite,
  removeContact,
};
