const listContacts = require('./listContacts.js')
const getAll = require('./getAll.js')
const getContactById = require('./getContactById.js')
const addContact = require('./addContact.js')
const updateContacts = require('./updateContacts.js')
const updateById = require('./updateById.js')
const removeContact = require('./removeContact.js')

module.exports = {
  listContacts,
  getAll,
  getContactById,
  addContact,
  updateContacts,
  updateById,
  removeContact,
}
