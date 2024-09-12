const addContact = require('./addContacts');
const deleteById = require('./deleteContact');
const updateFavoriteStatus = require('./favoriteContact');
const getAll = require('./getAllContacts');
const getContactById = require('./getContactsById');
const updateContact = require('./updateContacts');

module.exports = {
  addContact,
  deleteById,
  updateFavoriteStatus,
  getAll,
  getContactById,
  updateContact,
};
