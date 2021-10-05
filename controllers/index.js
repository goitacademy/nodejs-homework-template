const listContactsController = require('./contacts/listContactsController')
const getContactByIdController = require('./contacts/getContactByIdController')
const addContactController = require('./contacts/addContactController')
const removeContactController = require('./contacts/removeContactController')
const changeContactController = require('./contacts/changeContactController')
const updateStatusContactController = require('./contacts/updateStatusContactController')

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  changeContactController,
  updateStatusContactController
}
