const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '../../db/contacts.json')

const updateContact = async (newContacts) => {
  fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

module.exports = updateContact
