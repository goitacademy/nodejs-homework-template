const { getAllContacts } = require("./getAllContacts");
const { getById } = require("./getById");
const { addContact } = require("./addContact");
const { updateContact } = require("./updateContact");
const { updateFavorite } = require("./updateFavorite");
const { deleteContact } = require("./deleteContact");

module.exports = {
  getAllContacts,
  getById,
  addContact,
  updateContact,
  deleteContact,
  updateFavorite,
};
