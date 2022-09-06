const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateFavoriteById = require("./updateFavoriteById");

module.exports = {
  getAll,
  getById,
  addContact,
  updateById,
  updateFavoriteById,
  removeById,
};