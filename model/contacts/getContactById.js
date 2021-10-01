const listContacts = require('./listContacts')

const getContactById = async (id) => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === id)
  if (!contact) {
    return null
  }
  return contact
}
module.exports = getContactById
