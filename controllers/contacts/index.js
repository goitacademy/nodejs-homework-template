const getAll = require("./getAll");
const getContactById = require("./getContactById");
const addContacts = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const patchFavorite = require("./patchFavorite");

module.exports = {
  getAll,
  getContactById,
  addContacts,
  deleteContact,
  updateContact,
  patchFavorite,
};
