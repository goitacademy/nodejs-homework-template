const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)

  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...data, id }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContactById
