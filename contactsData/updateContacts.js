const fs = require('fs').promises
const contactsPath = require('./filePath')

const updateContacts = async (contacts) => {
  const contactsString = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, contactsString)
}

module.exports = updateContacts
