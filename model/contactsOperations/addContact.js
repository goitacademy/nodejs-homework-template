const getAll = require('./getAll')
const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../../', 'model', 'contacts.json')

async function addContact(data) {
  const contacts = await getAll()
  const id = contacts.length + 1
  const newContact = { id, ...data }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = addContact
