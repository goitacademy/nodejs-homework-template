const getAllContacts = require('./getAllContacts')
const getContById = require('./getContactById')
const deleteContactById = require('./deleteContactById')
const addNewContact = require('./addNewContact')
const contactUpdate = require('./contactUpdate')

module.exports = {
  getAllContacts,
  getContById,
  deleteContactById,
  addNewContact,
  contactUpdate,
}
