const getAll = require("./getAll");
const getById = require("./getById");
const addItem = require("./addItem");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateFavoriteById = require('./updateFavoriteById');

module.exports = {
  getAll,
  getById,
  addItem,
  deleteById,
  updateById,
  updateFavoriteById
};
