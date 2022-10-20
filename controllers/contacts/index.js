const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const updateContactsById = require('./updateContactsById')
const removeContact = require('./removeContact')
const updateStatusContact = require("./updateStatusContact")

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactsById,
  removeContact,
  updateStatusContact,
}
