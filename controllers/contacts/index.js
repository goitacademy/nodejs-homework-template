const getAll = require("./getAll");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const deleteContactById = require("./deleteContactById");
const updateFavoriteContactById = require("./updateFavoriteContactById");

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
  updateFavoriteContactById
};
