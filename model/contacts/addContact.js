// const fs = require('fs/promises')
const { v4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  // await fs.writeFile('../contacts.json', JSON.stringify(contacts))
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
