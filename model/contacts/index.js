const { getListContacts } = require('./getListContacts')
const { getById } = require('./geById')
const { removeContact } = require('./removeContact')
const { addContact } = require('./addContact')
const { changeContact } = require('./changeContact')

module.exports = {
  getListContacts,
  getById,
  removeContact,
  addContact,
  changeContact,
}
