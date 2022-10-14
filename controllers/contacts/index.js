const getAll = require('./getAll');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateById = require('./updateById');
const removeContact = require('./removeContact');
const updateFavorite = require('./updateFavorite');

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateById,
  removeContact,
  updateFavorite,
};
