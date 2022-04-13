const addNewContact = require('./addNewContact')
const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const deleteContactById = require('./deleteContactById')
const contactUpdate = require('./contactUpdate')
const changeStatus = require('./changeStatus')

module.exports = {
  addNewContact,
  getAllContacts,
  deleteContactById,
  contactUpdate,
  getContactById,
  changeStatus
}
