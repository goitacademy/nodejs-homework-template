const fs = require('fs/promises')
const contacts = require('../contacts.json')
const updateContacts = async (newContact) => {
  await fs.writeFile(contacts, JSON.stringify(newContact))
}

module.exports = updateContacts
