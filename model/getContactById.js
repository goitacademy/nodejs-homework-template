const getAll = require('./getAll')

const getContactById = async (id) => {
  const contacts = await getAll()
  const [contact] = contacts.filter((contact) => contact.id === id)
  return contact
}

module.exports = getContactById