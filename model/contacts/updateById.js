const updateContacts = require('./updateContacts')
const getALl = require('./getAll')

const updateById = async (id, data) => {
  const contacts = await getALl()
  const idx = contacts.findIndex(item => item.id === Number(id))
  if (idx === -1) return null
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateById
