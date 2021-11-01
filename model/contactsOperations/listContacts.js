const fs = require('fs/promises')

const contactsPath = require('./contactsPath')

async function listContacts() {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  if (!contacts) {
    return null
  }
  return contacts
}

module.exports = listContacts
