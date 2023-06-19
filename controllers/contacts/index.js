const { ctrlWrapper } = require('../../helpers');
const add = require('./add');
const getAll = require('./getAll');
const getById = require('./getById');
const removeById = require('./removeById');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
