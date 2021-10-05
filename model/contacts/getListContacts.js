const { Contact } = require('../../db/contactModel')

const getListContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}

module.exports = { getListContacts }
