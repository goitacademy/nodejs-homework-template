const { ctrlWrapper } = require('../../helpers');
const getList = require('./getList');
const add = require('./add');
const del = require('./del');
const getById = require('./getById');
const update = require('./update');
const updateFavorite = require('./updateFavorite');

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  del: ctrlWrapper(del),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
