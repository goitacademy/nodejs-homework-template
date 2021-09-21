const contacts = require('./contacts.json')
const rewriteContacts = require('./rewriteContacts')

const removeContact = async (contactId) => {
  const idx = contacts.findIndex(item => item.id.toString() === contactId)

  if (idx === -1) {
    return null
  }

  const removedContact = contacts[idx]

  contacts.splice(idx, 1)
  await rewriteContacts(contacts)
  return removedContact
}

module.exports = removeContact
