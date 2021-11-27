const fs = require('fs').promises

const contactsPath = require('./contactsPath')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(data)
}

module.exports = listContacts
