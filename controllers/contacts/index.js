const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateById = require('./updateById')
const updateFavorite = require('./updateFavorite')

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateFavorite
}
