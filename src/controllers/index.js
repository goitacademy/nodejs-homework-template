const { getList } = require('./contacts/getAll')
const { getContact } = require('./contacts/getContact')
const { addContact } = require('./contacts/addContact')
const { updateContactController } = require('./contacts/updateContact')
const { deleteContact } = require('./contacts/deleteContact')

module.exports = {
  getList,
  getContact,
  addContact,
  updateContactController,
  deleteContact
}
