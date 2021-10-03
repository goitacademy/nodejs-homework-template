const { Contact } = require('../../db/contactModel')

const getById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

module.exports = { getById }
