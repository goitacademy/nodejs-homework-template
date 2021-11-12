const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  const contacts = JSON.parse(result)
  return contacts
}

module.exports = listContacts
