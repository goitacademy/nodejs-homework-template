const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '../../models/contacts/contacts.json')

const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(result)
}

module.exports = readData
