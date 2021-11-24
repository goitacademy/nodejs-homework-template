const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')
const filePath = path.join(__dirname, 'contacts.json')

const updateById = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, contactId }
  await updateContacts(contacts)
  return contacts[idx]
}

const updateContacts = async(contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts))
}

module.exports = updateById
