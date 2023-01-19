const getAllContacts = require("./getAllContacts");
const addContact = require("./addContact");
const getContactById = require("./getContactById");
const updateById = require("./updadeById");
const deleteById = require("./deleteById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAllContacts,
  addContact,
  updateById,
  getContactById,
  deleteById,
  updateFavorite,
};
