const listContacts = require('./listContacts')
const updateContact = require('./updateContact')

const updateContactById = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...data, id }
  await updateContact(contacts)
  return contacts[idx]
}

module.exports = updateContactById
