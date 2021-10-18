const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const list = await listContacts()
  const contacts = list.find(item => item.id.toString() === contactId)
  if (!contacts) {
    return null
  }
  return contacts
}

module.exports = getContactById
