const { ctrlWrapper } = require('../../helpers');
const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const deleteById = require('./deleteById');
const updateContactById = require('./updateContactById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
