const getAll = require("./get");
const getById = require("./getId");
const add = require("./add");
const remove = require("./remove");
const update = require("./update");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateFavorite
};