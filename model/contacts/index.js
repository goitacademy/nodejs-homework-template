
const { listContacts } = require('./listContacts')
const { getContactById } = require('./getContactById')
const { addContact } = require('./addContact')
const { updateContact } = require('./updateContact')
const { replaceContact } = require('./replaceContact')
const { removeContact } = require('./removeContact')

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  replaceContact,
  removeContact,
}
