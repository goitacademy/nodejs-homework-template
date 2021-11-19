const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../db/contacts.json', '../../../', 'model', 'contacts', 'db', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(data)
}

module.export = listContacts
