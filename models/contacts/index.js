const listContacts = require('./ListContacts')
const getByIdContact = require('./getByIdContact')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')
const readData = require('./readData')
const contactsPath = require('./contactsPath')

module.exports = {
  listContacts,
  getByIdContact,
  removeContact,
  addContact,
  updateContact,
  readData,
  contactsPath,
}
