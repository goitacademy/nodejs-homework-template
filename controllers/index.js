const listContactsController = require('./contacts/listContactsController')
const getContactByIdController = require('./contacts/getContactByIdController')
const addContactController = require('./contacts/addContactController')
const removeContactController = require('./contacts/removeContactController')
const changeContactController = require('./contacts/changeContactController')

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController
}
