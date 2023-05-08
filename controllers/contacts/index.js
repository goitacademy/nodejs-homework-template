const { getListContact } = require("./getListContact");
const { getByIdContact } = require("./getByIdContact");
const { updateContact } = require("./updateContact");
const { updateContactFavorite } = require("./updateContactFavorite");
const { addContact } = require("./addContact");
const { removeByIdContact } = require("./removeByIdContact");

module.exports = {
  getListContact,
  getByIdContact,
  updateContact,
  updateContactFavorite,
  addContact,
  removeByIdContact,
};
