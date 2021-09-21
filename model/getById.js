const getAll = require('./getAll')

const getById = async (id) => {
  const contacts = await getAll()
  const contact = contacts.find(
    (contact) => contact.id.toString() === id.toString(),
  )
  if (!contact) {
    return null
  }
  return contact
}

module.exports = getById
