const getContacts = require('./getContacts');
const getById = require('./getById');
const add = require('./add');
const removeById = require('./removeById');
const updateById = require('./updateById');
const updateFavoriteById = require('./updateFavoriteById')

module.exports = {
  getContacts,
  getById,
  add,
  removeById,
  updateById,
  updateFavoriteById,
}