const getAll = require("./getAll");
const getById = require("./getById");
const addNew = require("./addNew");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateStatusContact = require("./updateFavorite");

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  addNew,
  updateStatusContact,
};
