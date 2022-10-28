const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const updateById = require('./updateById');
const removeById = require('./removeById');
const updateFavorite = require('./updateFavorite');
const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require('../auth');

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateFavorite,
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
