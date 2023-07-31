const { ctrlWrapper } = require('../../helpers');

const { add } = require('./add');
const { getAll } = require('./getAll');
const { getById } = require('./getById');
const { deleteById } = require('./deleteById');
const { updateById } = require('./updateById');
const { updateStatusContact } = require('./updateStatusContact');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
