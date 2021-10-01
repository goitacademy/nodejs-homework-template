const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (id) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id.toString() === id)
  if (!index) {
    throw new Error('Id incorect')
  }
  contacts.splice(index, 1)
  await updateContacts(contacts)
  return 'Success delete'
}
module.exports = removeContact
