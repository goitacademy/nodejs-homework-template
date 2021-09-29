const getAll = require("./getAll");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContactById = require("./removeContactById");
const updateContactsById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAll,
  getContactById,
  addContact,
  removeContactById,
  updateContactsById,
  updateFavorite,
};
