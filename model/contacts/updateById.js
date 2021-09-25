const updateContacts = require('./updateContacts.js')
const getAll = require('./getAll.js')

const updateById = async (contactId, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((contact) => String(contact.id) === contactId)

  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}
module.exports = updateById
