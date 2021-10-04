const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

async function addContact(data) {
  const contacts = await getAll()
  const id = contacts.length + 1
  const newContact = { id, ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
