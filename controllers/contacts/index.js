const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const updateContact = require("./updateById");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
};
