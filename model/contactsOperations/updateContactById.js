const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async(contactId, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...data, contactId }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContactById
