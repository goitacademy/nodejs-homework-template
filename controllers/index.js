const getAllContacts = require('./getAllContacts')
const getContById = require('./getContactById')
const deleteContactById = require('./deleteContactById')
const addNewContact = require('./addNewContact')
const contactUpdate = require('./contactUpdate')
const updateStatus = require('./updateStatus')

module.exports = {
  getAllContacts,
  getContById,
  deleteContactById,
  addNewContact,
  contactUpdate,
  updateStatus,
}
