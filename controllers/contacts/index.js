const { getAll } = require("./getAllContacts");
const { getById } = require("./getContactById");
const { add } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { update } = require("./updateContact");
const { updateFavorite } = require("./updateFavoriteContact");

module.exports = {
  getAll,
  getById,
  add,
  deleteContact,
  update,
  updateFavorite,
};
