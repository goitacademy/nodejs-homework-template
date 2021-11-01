const getAllContacts = require('./getAllContacts')
const updateContacts = require('./updateContacts')

const removedContact = async id => {
  const contacts = await getAllContacts()
  const findIdx = contacts.findIndex(contact => contact.id === id)
  if (findIdx === -1) {
    return null
  }
  const deleteContact = contacts.splice(findIdx, 1)
  await updateContacts(contacts)
  return deleteContact
}

module.exports = removedContact
