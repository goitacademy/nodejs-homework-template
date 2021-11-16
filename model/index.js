const listContacts = require('./controllers/listContats')
const getContactById = require('./controllers/getContactById')
const addContact = require('./controllers/addContact')
const removeContact = require('./controllers/removeContact')
const updateContact = require('./controllers/updateContact')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
