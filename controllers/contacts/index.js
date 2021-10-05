const getContacts = require('./getContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateContactsById = require('./updateContactsById')
const updateFavorite = require('./updateFavorite')

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactsById,
  updateFavorite,
}
