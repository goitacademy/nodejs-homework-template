const { getAll } = require('./getAll');
const { getById } = require('./getById');
const { deleteById } = require('./deleteById');
const { updateById } = require('./updateById');
const { add } = require('./add');

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  add
}
