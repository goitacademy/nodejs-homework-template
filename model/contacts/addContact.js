const { v4 } = require('uuid')
const listContacts = require('./listContacts')
const updateContacts = require('./updateContact')

const addContact = async(data) => {
  const contacts = await listContacts()
  const newContact = { ...data, id: v4() }
  const newContacts = [...contacts, newContact]
  await updateContacts(newContacts)
  return newContact
}

module.exports = addContact
