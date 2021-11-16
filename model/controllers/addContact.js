const { v4: uuidv4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContact = require('./updateContact')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { ...data, id: uuidv4() }
  contacts.push(newContact)
  await updateContact(contacts)
  return newContact
}
module.exports = addContact
