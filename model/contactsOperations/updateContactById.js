const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const updateContactsById = async (contactId, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...data }
  await updateContacts(contacts)
  return contacts[idx]
}
module.exports = updateContactsById
