const getAll = require('./getAll');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./addContact');
const removeContact = require('./removeContact');
const updateFavoriteContact = require('./updateFavoriteContact');

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavoriteContact,
};
