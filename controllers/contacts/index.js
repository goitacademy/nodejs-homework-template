// created by Irina Shushkevych
const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')
const updateContactFavorites = require('./updateContactFavorits')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactFavorites,
  updateContact,
}
