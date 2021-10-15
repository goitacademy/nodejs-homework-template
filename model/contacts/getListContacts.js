const { Contact } = require('../../db/contactModel')

const getListContacts = async (id) => {
  const contacts = await Contact.find({ owner: id })
  return contacts
}

module.exports = { getListContacts }
