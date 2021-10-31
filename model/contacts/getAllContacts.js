const fs = require('fs/promises')
const contactsPath = require('./contactsPath')

async function getAllContacts() {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

module.exports = getAllContacts
