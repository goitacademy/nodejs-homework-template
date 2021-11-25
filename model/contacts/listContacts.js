const fs = require('fs').promises

const contactsPath = require('./contactsPath')

const listContacts = async () => {
   const contacts = await fs.readFile(contactsPath, 'utf8')
   return JSON.parse(contacts)
}

module.exports = listContacts