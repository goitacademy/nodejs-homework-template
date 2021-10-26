const { getAllContacts } = require('./getAllContacts')
const { getOneContactById } = require('./getOneContactById')
const { postContact } = require('./postContact')
const { patchContact } = require('./patchContact')
const { putContact } = require('./putContact')
const { deleteContact } = require('./deleteContact')

module.exports = {
  getAllContacts,
  getOneContactById,
  postContact,
  patchContact,
  putContact,
  deleteContact
}
