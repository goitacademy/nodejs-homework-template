const { getContacts } = require('./getContacts')
const { getContactById } = require('./getContactById')
const { deleteContact } = require('./deleteContact')
const { updateContact } = require('./updateContact')
const { postContact } = require('./postContact')

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  updateContact,
  postContact,
}
