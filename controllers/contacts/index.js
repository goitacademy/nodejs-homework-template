const getContacts = require('./getContacts')
const getById = require('./getById')
const addContact = require('./addContact')
const deleteContact = require('./deleteContact')
const updateContact = require('./updateContact')
const updateStatusContact = require('./updFavorite')

module.exports = {
  getContacts,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
}
