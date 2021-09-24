const listContacts = require('./contacts/listContacts.js')
const getAll = require('./contacts/getAll.js')
const getContactById = require('./contacts/getContactById.js')
const addContact = require('./contacts/addContact.js')
const updateContact = require('./contacts/updateContact.js')
const updateById = require('./contacts/updateById.js')
// const removeContact = require('./removeContact.js')

module.exports = {
  listContacts,
  getAll,
  getContactById,
  addContact,
  updateContact,
  updateById,
  // removeContact,
}
