const { v4 } = require('uuid')
const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const add = async (data) => {
  const contacts = await listContacts()
  const newContact = { ...data, id: v4() }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = add
