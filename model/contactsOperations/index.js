const listContacts = require('./getAll')
const getById = require('./getById')
const addContact = require('./addContact')
const updateContactsById = require('./updateContactById')
const updateContacts = require('./updateContacts')
const removeContact = require('./removeContact')

module.exports = {
  listContacts,
  addContact,
  updateContactsById,
  getById,
  removeContact,
  updateContacts
}
