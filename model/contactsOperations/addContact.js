const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContact = require('./updateContacts')

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { id: uuidv4(), ...body }
  contacts.push(newContact)
  await updateContact(contacts)

  return newContact
}

module.exports = addContact
