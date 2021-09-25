const getAll = require('./getAll.js')
const updateContacts = require('./updateContacts.js')

async function removeContact(contactId) {
  const contacts = await getAll()
  const idx = contacts.findIndex((contact) => String(contact.id) === contactId)

  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return 'Success remove'
}

module.exports = removeContact
