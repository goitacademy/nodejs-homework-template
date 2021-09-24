const listContacts = require('./get-contactsList')
const updateContacts = require('./update-contacstList')

const addContact = async (name, email, phone) => {
  const newContact = { id: v4(), name, email, phone }
  const contacts = await listContacts()
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
