// const fs = require('fs/promises')
const { v4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  // await fs.writeFile('../contacts.json', JSON.stringify(contacts))
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
