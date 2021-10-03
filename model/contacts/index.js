const { getListContacts } = require('./getListContacts')
const { getById } = require('./getById')
const { removeContact } = require('./removeContact')
const { addContact } = require('./addContact')
const { changeContact } = require('./changeContact')
const { updateStatusContact } = require('./updateStatusContact')

module.exports = {
  getListContacts,
  getById,
  removeContact,
  addContact,
  changeContact,
  updateStatusContact
}
