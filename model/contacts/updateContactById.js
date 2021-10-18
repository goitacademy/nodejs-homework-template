const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async (contactId, body) => {
  const list = await listContacts()
  const idx = list.findIndex(el => el.id === contactId)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...list[idx], ...body }
  list[idx] = updateContact
  await updateContacts(list)
  return updateContact
}

module.exports = updateContactById
