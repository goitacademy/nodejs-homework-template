const contacts = require('./contacts.json')

const getContactByIdModel = (contactId) => {
  try {
    const parsedId = parseInt(contactId) ? parseInt(contactId) : contactId
    const [filteredContact] = contacts.filter(elem => elem.id === parsedId)
    if (filteredContact) {
      return filteredContact
    } else {
      return
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = getContactByIdModel
