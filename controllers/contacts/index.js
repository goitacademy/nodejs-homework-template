const {getAll}  = require('../contacts/getAll')
const { getById } = require('../contacts/getById');
const { add } = require('../contacts/add');
const { updateById } = require('../contacts/updateById');
const { updateStatusContact } = require('../contacts/updateStatusContact');
const { deleteById } = require('../contacts/deleteById');

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  deleteById,
};
