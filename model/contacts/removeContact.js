const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (id) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id.toString() === id)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return true
}

module.exports = removeContact
