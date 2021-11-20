const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, '../db/contacts.json')

const updateContacts = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact))
}

module.exports = updateContacts
