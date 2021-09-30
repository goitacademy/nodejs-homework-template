const { v4 } = require('uuid')
const listContacts = require('./get-contactsList')
const updateContacts = require('./update-contacstList')

const addContact = async (data) => {
  const newContact = { ...data, id: v4() }
  const contacts = await listContacts()
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
