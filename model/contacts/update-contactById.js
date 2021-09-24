const updateContacts = require('./update-contacstList')
const listContacts = require('./get-contactsList')

const updateContactById = async(id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  const updateContact = { ...contacts[idx], ...data }
  contacts[idx] = updateContact
  await updateContacts(contacts)
  return updateContacts
}

module.exports = updateContactById
