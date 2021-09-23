const fs = require('fs/promises')
const path = require('path')

const PATH_DB = path.join(__dirname, 'contacts.json')

const removeContactModel = async (contactId) => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8')
    const parsedContacts = JSON.parse(contacts)
    const parsedId = parseInt(contactId) ? parseInt(contactId) : contactId
    const filteredContact = parsedContacts.find(elem => elem.id === parsedId)
    if (filteredContact) {
      const filteredData = parsedContacts.filter(elem => elem.id !== parsedId)
      const parsedData = JSON.stringify(filteredData)
      await fs.writeFile(PATH_DB, parsedData, 'utf-8')
      return filteredContact
    } else {
      return
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = removeContactModel
