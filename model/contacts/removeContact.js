const listContacts = require('./listContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const updateContacts = contacts.filter((contact) => contact.id !== Number(contactId))
  return updateContacts
}

module.exports = removeContact
