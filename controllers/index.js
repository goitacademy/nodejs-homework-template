const getAllContacts = require('./getAllContacts')
const getContById = require('./getContactById')
const deleteContactById = require('./deleteContactById')
const addNewContact = require('./addNewContact')
const contactUpdate = require('./contactUpdate')
const updateStatus = require('./updateStatus')
const auth = require('./auth')

module.exports = {
  auth,
  getAllContacts,
  getContById,
  deleteContactById,
  addNewContact,
  contactUpdate,
  updateStatus,
}
