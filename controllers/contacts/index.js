const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getContacts,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
