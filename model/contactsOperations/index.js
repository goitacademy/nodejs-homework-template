const listContacts = require('./getAll')
const getById = require('./getById')
const addContact = require('./addContact')
const updateContactsById = require('./updateContactById')
const removeContact = require('./removeContact')

module.exports = {
  listContacts,
  addContact,
  updateContactsById,
  getById,
  removeContact
}
