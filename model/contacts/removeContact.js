const {
  ContactModel
} = require('../../db/contactModel')

const removeContact = async (contactId) => {
  const deletedContact = await ContactModel.findByIdAndRemove(contactId)

  return deletedContact
}

module.exports = removeContact
