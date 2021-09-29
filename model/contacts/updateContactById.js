const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = require('./listContacts')

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const updateContactById = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.find(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...data }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateContactById
