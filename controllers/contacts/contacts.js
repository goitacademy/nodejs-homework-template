const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateByFavorite = require("./updateByFavorite");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateByFavorite: ctrlWrapper(updateByFavorite),
  updateById: ctrlWrapper(updateById),
};
