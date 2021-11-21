const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve(__dirname, '../db/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  const contacts = JSON.parse(data)

  return contacts
}

module.exports = listContacts
