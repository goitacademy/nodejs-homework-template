const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return true
}
module.exports = removeContact
