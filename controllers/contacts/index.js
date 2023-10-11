const getAll = require('./getAll');
const getById = require('./getById');
const deleteById = require('./deleteById');
const add = require('./add');
const updateById = require('./updateById');
const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
