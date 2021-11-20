const listContacts = require('./listContacts')


const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  // console.log(contacts[idx])

  return contacts[idx]
}

// getContactById(7)

module.exports = getContactById
