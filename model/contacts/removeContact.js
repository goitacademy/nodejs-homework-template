const { Contact } = require('../../db/contactModel')

const removeContact = async (contactId) => {
  await Contact.findByIdAndRemove(contactId)
}

module.exports = { removeContact }
