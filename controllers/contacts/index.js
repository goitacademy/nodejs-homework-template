const getAll = require('./getAll');
const getByid = require('./gtById');
const add = require('./add');
const removeById = require('./removeById');
const updateById = require("./updateById")
const updateFavorite = require('./updateFavorite')

module.exports = {
  getAll,
  getByid,
  add,
  removeById,
  updateById,
  updateFavorite
};
