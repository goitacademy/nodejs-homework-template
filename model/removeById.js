const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const removeById = async (id) => {
  const contacts = await getAll()
  const idx = contacts.findIndex(
    (contact) => contact.id.toString() === id.toString(),
  )
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return 'Success remove'
}

module.exports = removeById
