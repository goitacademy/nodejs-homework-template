  
const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContactById = require('./updateContactById');
const deleteContactById = require('./deleteContactById');
const toggleFavoriteContact = require('./toggleFavoriteContact');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
  toggleFavoriteContact,
};