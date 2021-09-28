const listContacts = require('./listContacts')
const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  }
  console.log(newContact)
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = addContact
