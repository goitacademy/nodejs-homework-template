const updateContact = require('./updateContact.js')
const getAll = require('./getAll.js')

const updateById = async (id, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((contact) => contact.contactId === id)
  if (idx === -1) {
    return null
  }
  const updateContacts = { ...contacts[idx], ...data }
  contacts[idx] = updateContacts
  await updateContact(contacts)
  return updateContacts
}
module.exports = updateById
