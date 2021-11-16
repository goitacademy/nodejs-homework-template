const fs = require('fs/promises')
const contacts = require('../contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contacts, 'utf8')
  return JSON.parse(data)
}

module.export = listContacts
