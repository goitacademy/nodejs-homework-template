const path = require('path')
const fs = require('fs/promises')
const { v4 } = require('uuid')

const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, 'contacts.json')

async function addContact (data) {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return newContact
};

module.exports = addContact
