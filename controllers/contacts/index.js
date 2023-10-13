const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const deleteById = require('./deleteById');
const updateById = require('./updateById');
const updateFavorite = require('./updateFavorite');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
