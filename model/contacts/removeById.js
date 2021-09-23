const listContacts = require('./listContacts')
const udpateContacts = require('./updateContacts')

const removeById = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await udpateContacts(contacts)
  return `Contact with id=${contactId} has been successfully removed`
}

module.exports = removeById
