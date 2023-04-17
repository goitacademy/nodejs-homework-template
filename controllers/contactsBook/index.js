// const addContact = require("./addContact");
const { getAll } = require("./getAllContacts");
const { getContactById } = require("./getContactById");
const { addContact } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");
const { updateFavorite } = require("./updateFavorite");

module.exports = {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
