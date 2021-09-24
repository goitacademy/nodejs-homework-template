const getAll = require('./getAll')

const getById = async (id) => {
  const contacts = await getAll()
  const contact = contacts.find(item => item.id === Number(id))
  if (!contact) return null
  return contact
}

module.exports = getById
