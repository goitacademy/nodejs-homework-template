const listContacts = require('./get-contactsList')

const getContactById = async contactId => {
  const contacts = await listContacts()
  const contact = contacts.find(i => i.id.toString() === contactId)
  if (!contact) {
    return null
  }
  return contact
}

module.exports = getContactById
