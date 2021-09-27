const fs = require('fs/promises')
const path = require('path')
const PATH_DB = path.join(__dirname, '..', 'contacts.json')

const getContactByIdModel = async (contactId) => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8')
    const parsedContactsData = JSON.parse(contacts)
    const parsedId = parseInt(contactId) ? parseInt(contactId) : contactId
    const [filteredContact] = parsedContactsData.filter(elem => elem.id === parsedId)
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
