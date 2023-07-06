const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");
const register = require("./auth");

module.exports = {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContactById,
  updateFavorite,
  register,
};
