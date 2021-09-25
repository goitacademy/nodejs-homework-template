const getAll = require('./getAll.js')

async function getContactById(contactId) {
  const contacts = await getAll()
  const contact = contacts.find((contact) => String(contact.id) === contactId)

  if (!contact) {
    return null
  }

  return contact
}

module.exports = getContactById
