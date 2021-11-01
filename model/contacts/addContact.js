const { v4: uuidv4 } = require('uuid')
const getAllContacts = require('./getAllContacts')
const updateContact = require('./updateContacts')

const addContact = async data => {
  const contacts = await getAllContacts()
  const newContact = { id: uuidv4(), ...data }
  contacts.push(newContact)
  await updateContact(contacts)
  return newContact
}

module.exports = addContact
