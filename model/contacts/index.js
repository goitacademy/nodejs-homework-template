// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

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
}
