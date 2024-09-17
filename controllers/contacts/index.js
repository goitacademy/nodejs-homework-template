const getAll = require("./getAll");
const getById = require("./getById");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const addContact = require("./addContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  updateFavorite,
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
};
