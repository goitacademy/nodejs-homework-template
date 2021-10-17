const { Contact } = require('../../db/contactModel')

const getListContacts = async ({ id, page, limit }) => {
  const skip = (page - 1) * limit
  const contacts = await Contact.find({ owner: id }, '_id content owner', { skip, limit: +limit })
  return contacts
}

module.exports = { getListContacts }
