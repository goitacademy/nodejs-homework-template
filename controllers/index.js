const listContacts = require('./contacts/listContacts')
const getContactById = require('./contacts/getContactById')
const addContact = require('./contacts/addContact')
const updateContactById = require('./contacts/updateContactById')
const removeContact = require('./contacts/removeContact')
const updateStatusContact = require('./contacts/updateStatusContact')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact
}
