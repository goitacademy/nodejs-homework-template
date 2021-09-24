const getAll = require('./getAll')
const updateContacts = require('./updateContacts')

const removeById = async (id) => {
  const contacts = await getAll()
  const idx = contacts.findIndex(item => item.id === Number(id))
  if (idx === -1) return null
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return { message: 'contact deleted' }
}

module.exports = removeById
