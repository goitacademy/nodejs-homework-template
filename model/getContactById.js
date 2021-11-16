const listContacts = require('./listContacts')

async function getContactById(contactId) {
  console.log('contactId - ', contactId)

  const contacts = await listContacts()
  const contact = contacts.filter(contact => contact.id === parseInt(contactId))
  return contact
}

module.exports = getContactById
