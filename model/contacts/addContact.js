const { v4 } = require('uuid')

const updateContact = require('./updateContact')
const listContacts = require('./listContacts')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContactList = { ...data, id: v4() }
  contacts.push(newContactList)
  await updateContact(contacts)
  return newContactList
}

module.exports = addContact
