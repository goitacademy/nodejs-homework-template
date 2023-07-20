const { getAll } = require("./getContactsAll");
const { getById } = require("./getContactsById");
const { addNewContact } = require("./addContactNew");
const { updateById } = require("./updateContactById");
const { updateFavorite } = require("./updateContactsFavorite");
const { deleteById } = require("./deleteContactById");

module.exports = {
  getAll,
  getById,
  addNewContact,
  updateById,
  updateFavorite,
  deleteById,
};
