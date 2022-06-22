const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContactById = require('./updateContactById');
const removeContact = require('./removeContact');
const updateFavorite = require('./updateFavorite')
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateFavorite
}
