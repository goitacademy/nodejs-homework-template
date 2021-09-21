const contacts = require('./contacts.json')
const rewriteContacts = require('./rewriteContacts')

const updateContact = async (contactId, body) => {
  const idx = contacts.findIndex(item => item.id.toString() === contactId)

  if (idx === -1) {
    return null
  }

  const updatedContact = { ...contacts[idx], ...body }

  contacts[idx] = updatedContact
  rewriteContacts(contacts)

  return updatedContact
}

module.exports = updateContact
