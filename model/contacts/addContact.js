const { v4 } = require('uuid')

const updateContact = require('./updateContact')
const listContacts = require('./listContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { ...data, id: v4() }
  contacts.push(newContact)
  await updateContact(contacts)
  return newContact
}

module.exports = addContact
