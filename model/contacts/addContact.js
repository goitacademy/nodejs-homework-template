const getAll = require('./getAll')
const { v4 } = require('uuid')
const updateContacts = require('./updateContacts')

const addContact = async (data) => {
  const contacts = await getAll()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
