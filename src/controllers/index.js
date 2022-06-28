const { getList } = require('./contacts/getAll')
const { getContact } = require('./contacts/getContact')
const { addContact } = require('./contacts/addContact')
const { updateContact } = require('./contacts/updateContact')
const { updateStatus } = require('./contacts/updateStatus')
const { deleteContact } = require('./contacts/deleteContact')

module.exports = {
  getList,
  getContact,
  addContact,
  updateContact,
  updateStatus,
  deleteContact
}
