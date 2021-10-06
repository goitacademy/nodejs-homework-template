const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...body }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateContact
