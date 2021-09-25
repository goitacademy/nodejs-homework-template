const { nanoid } = require('nanoid')
const getAll = require('./getAll.js')

const updateContacts = require('./updateContacts.js')

const addContact = async (data) => {
  const contacts = await getAll()
  const newContact = { ...data, id: nanoid() }
  contacts.push(newContact)

  await updateContacts(contacts)

  return newContact
}

module.exports = addContact
