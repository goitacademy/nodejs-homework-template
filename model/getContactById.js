const contacts = require('./contacts.json')

const getContactById = async (contactId) => {
  const contact = contacts.find(item => item.id.toString() === contactId)

  if (!contact) {
    return null
  }

  return contact
}

module.exports = getContactById
