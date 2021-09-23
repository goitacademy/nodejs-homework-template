const listContacts = require('./listContacts')

const getById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === contactId)
  if (!contact) {
    return null
  }
  return contact
}

module.exports = getById
