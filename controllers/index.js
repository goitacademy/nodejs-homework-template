// const contacts = require('./contacts')
const listContacts = require('./get-contactsList')
const getContactById = require('./get-contactById')
const removeContact = require('./remove-contactById')
const addContact = require('./add-contact')
const updateContact = require('./update-contactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
