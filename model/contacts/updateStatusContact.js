const { Contact } = require('../../db/contactModel')

const updateStatusContact = async (contactId, body) => {
  const updateContact = await Contact.findByIdAndUpdate(contactId, { $set: body })
  return updateContact
}

module.exports = { updateStatusContact }
