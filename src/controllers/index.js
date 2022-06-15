const { getList } = require('./contacts/getAll')
const { getContact } = require('./contacts/getContact')
const { addContactController } = require('./contacts/addContact')
const { updateContactController } = require('./contacts/updateContact')
const { deleteContact } = require('./contacts/deleteContact')

module.exports = {
  getList,
  getContact,
  addContactController,
  updateContactController,
  deleteContact
}
