const listContacts = require('./listContacts')

async function updateContact(contactId) {
  const contacts = await listContacts()

  console.table('updateContact')
  return contacts
}

module.exports = updateContact
