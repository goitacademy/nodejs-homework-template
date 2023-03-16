const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const deleteById = require('./deleteById');
const updateById = require('./updateById');
const updateFavorite = require('./updateFavorite');

module.exports = {
  getAll,
  add,
  getById,
  deleteById,
  updateById,
  updateFavorite,
};