const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const updateById = async (contactId, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateById
