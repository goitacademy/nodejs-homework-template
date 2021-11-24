const { listContacts } = require('./listContacts')

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find((contact) => contact.id === Number(id))

  return result
}

module.exports = { getContactById }
