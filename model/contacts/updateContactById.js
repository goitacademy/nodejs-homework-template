const getAllContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async (id, data) => {
  const contacts = await getAllContacts()
  const idx = contacts.findIndex(contact => contact.id === id)

  if (idx === -1) {
    return null
  }

  contacts[idx] = { id, ...data }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContactById
