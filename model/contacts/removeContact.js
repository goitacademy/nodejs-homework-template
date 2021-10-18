const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  const list = await listContacts()
  const newContacts = list.filter(item => item.id.toString() !== contactId)
  updateContacts(newContacts)
  return newContacts
}

module.exports = removeContact
