const fs = require('fs/promises')

const contactsPath = require('./contactsPath')

async function updateContacts(newContacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
}

module.exports = updateContacts
