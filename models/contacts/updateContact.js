const path = require('path')
const fs = require('fs/promises')

const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, 'contacts.json')

async function updateContact (id, data) {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...data }
  const contactsStr = JSON.stringify(contacts, null, 2)
  await fs.writeFile(contactsPath, contactsStr)

  return contacts[idx]
};

module.exports = updateContact
