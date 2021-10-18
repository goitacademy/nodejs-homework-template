/* eslint-disable no-useless-catch */
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json')

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, ' '))
}
module.exports = updateContacts
