const fs = require('fs/promises')
const contactsPath = require('./contactsPath')
const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')

const addContact = async data => {
  const contacts = await listContacts()
  const newContact = { id: uuidv4(), ...data }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = addContact
