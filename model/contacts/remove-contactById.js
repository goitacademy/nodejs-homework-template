const listContacts = require('./get-contactsList')
const updateContacts = require('./update-contacstList')

const removeContact = async contactId => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(i => i.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return 'Success remove'
}

module.exports = removeContact
