const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateContactById = require('./updateContacts')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
