const getAll = require('./getAll')
const getContactId = require('./getContactId')
const postContact = require('./post')
const deleteContact = require('./deleteContact')
const putContact = require('./putContact')
const selectedContact = require('./selectedContact')

module.exports = {
  getAll,
  getContactId,
  postContact,
  deleteContact,
  putContact,
  selectedContact,
}
