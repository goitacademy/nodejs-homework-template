const fs = require('fs/promises')
const contactsPath = require('./filePath.js')

const updateContact = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact))
}

module.exports = updateContact
