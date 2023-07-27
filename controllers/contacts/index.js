const { ctrlWrapper } = require("../../decorators/index");

const getAll = require("./getAll.js");

const getById = require("./getById.js");

const add = require("./add.js");

const updateById = require("./updateById.js");

const updateFavorite = require("./updateFavorite");

const deleteById = require("./deleteById");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
