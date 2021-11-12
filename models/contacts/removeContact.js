const path = require('path')
const fs = require('fs/promises')

const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, 'contacts.json')

async function removeContact (contactId) {
  const contacts = await listContacts()
  const filteredContacts = contacts.filter(contact => String(contact.id) !== contactId)

  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
  const [result] = contacts.filter(contact => String(contact.id) === contactId)
  return result
}

module.exports = removeContact
