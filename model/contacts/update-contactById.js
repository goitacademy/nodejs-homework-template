const updateContacts = require('./update-contacstList')
const listContacts = require('./get-contactsList')

const updateContactById = async(id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id.toString() === id.toString())
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContact
}

module.exports = updateContactById
