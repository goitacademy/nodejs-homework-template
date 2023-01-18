const { getContactControllers } = require('./getContactController')
const { getContactByIdControllers } = require('./getContactsByIdController')
const { addContactController } = require('./addContactController')
const { removeContactController } = require('./removeContactController')
const { updateContactController } = require('./updateContactController')
const {updateStatusContactController } = require('./updateStatusController')


module.exports = {
  getContactControllers,
  getContactByIdControllers,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController
}