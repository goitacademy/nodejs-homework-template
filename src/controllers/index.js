const getAll = require("./contacts/getAll");
const getById = require("./contacts/getById");
const add = require("./contacts/add");
const deleteById = require("./contacts/deleteById");
const updateById = require("./contacts/updateById");
const updateFavorite = require("./contacts/updateFavorite");

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateFavorite,
};
