const getAll = require("./getAll");
const getContactById = require("./getContactById");
const removeContact = require("./removeById");
const addContact = require("./addContact");
const updateContact = require("./updateById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
