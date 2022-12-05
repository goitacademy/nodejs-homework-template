const getAll = require("./getAll");
const getContactById = require("./getContactById");
const add = require("./add");
const updateById = require("./updateById");
const updateFavorite = require("./updateFavorite");
const deleteById = require("./deleteById");

module.exports = {
  deleteById,
  updateById,
  getAll,
  getContactById,
  add,
  updateFavorite,
};
