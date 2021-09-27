const fs = require('fs/promises')
const path = require('path')
const PATH_DB = path.join(__dirname, '..', 'contacts.json')

const changeContactModel = async (contactId, body) => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8')
    const parsedContactsData = JSON.parse(contacts)
    const parsedId = parseInt(contactId) ? parseInt(contactId) : contactId
    const filteredContact = parsedContactsData.find(elem => elem.id === parsedId)
    if (filteredContact) {
      const newFilteredContacts = parsedContactsData.filter(elem => elem.id !== parsedId)
      const newContact = {
        id: filteredContact.id,
        name: body.name ? body.name : filteredContact.name,
        email: body.email ? body.email : filteredContact.email,
        phone: body.phone ? body.phone : filteredContact.phone
      }
      newFilteredContacts.push(newContact)
      const newData = JSON.stringify(newFilteredContacts)
      fs.writeFile(PATH_DB, newData, 'utf8')

      const newContactsData = await fs.readFile(PATH_DB, 'utf-8')
      const newParsedContactsData = JSON.parse(newContactsData)
      const idCreatedContact = parseInt(newContact.id) ? parseInt(newContact.id) : newContact.id
      const [newFilteredContact] = newParsedContactsData.filter(elem => elem.id === idCreatedContact)
      if (Object.keys(newFilteredContact).length === 4) {
        return newFilteredContact
      }
    } else {
      return
    }
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = changeContactModel
