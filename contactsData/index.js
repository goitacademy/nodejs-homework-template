const listContacts = require('./getAll')
const getContactById = require('./getById')
const updateContact = require('./updateById')
const removeContact = require('./del')
const addContact = require('./add')

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact
}
