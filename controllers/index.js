<<<<<<< HEAD
const listContacts = require('./listContacts')

const getContactById = require('./getContactById')

const removeContact = require('./removeContact')

const addContact = require('./addContact')

const updateContact = require('./updateContact')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
=======
const addContact = require('./addContact')
const getContactById = require('./getContactById')
const listContacts = require('./listContacts')
const removeContact = require('./removeContact')
const updateContact = require('./updateContact')
const updateFavorite = require('./updateFavorite')

module.exports = {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateFavorite
>>>>>>> origin/hw-03-mongodb
}
