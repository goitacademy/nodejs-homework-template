const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const updateById = async (contactId, data) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === Number(contactId))
  if (index === -1) {
    return null
  }
  const updateContact = { ...contacts[index], ...data }
  contacts[index] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateById
