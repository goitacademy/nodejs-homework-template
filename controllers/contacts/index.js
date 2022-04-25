const getContacts = require('./getContacts')
const getContactById = require('./getContactById')
const postContact = require('./postContact')
const deleteContact = require('./deleteContact')
const putContact = require('./putContact')
const patchFavoriteContact = require('./patchFavoriteContact')

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  patchFavoriteContact,
}
