const getAll = require("./getAll");
const getContactById = require("./getContactsById");
const addContact = require("./addContacts");
const updateContact = require("./updateContacts");
const deleteContacts = require("./deleteContacts");
const updateFavorite = require("./updateFavorite");
module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  deleteContacts,
  updateFavorite,
};
