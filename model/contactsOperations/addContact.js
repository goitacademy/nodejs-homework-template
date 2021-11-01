const { v4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
