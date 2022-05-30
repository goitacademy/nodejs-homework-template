const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const updateById = require('./updateByID');
const updateFav = require('./updateFav');
const deleteContacts = require('./deleteContacts');

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateFav,
  deleteContacts,
};