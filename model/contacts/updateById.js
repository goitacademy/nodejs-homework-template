const updateContacts = require('./updateContacts')
const getAll = require('./getAll')

const updateById = async (id, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex(
    (contact) => contact.id.toString() === id.toString(),
  )
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateById
