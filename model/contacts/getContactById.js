const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((contact) => contact.id === Number(contactId))
  return contact
}

module.exports = getContactById
