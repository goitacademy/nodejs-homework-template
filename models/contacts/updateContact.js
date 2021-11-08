const fs = require('fs/promises')
const listContacts = require('./listContacts')
const contactsPath = require('./contactsPath')

const updateContact = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }

  contacts[idx] = { id, ...data }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = updateContact
