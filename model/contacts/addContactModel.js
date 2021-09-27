const fs = require('fs/promises')
const path = require('path')
const { nanoid: generateId } = require('nanoid')
const phoneNumberFormatter = require('../../utils/phoneNumberFormatter')
const PATH_DB = path.join(__dirname, '..', 'contacts.json')

const addContactModel = async ({ name, email, phone }) => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8')
    const parsedContactsData = JSON.parse(contacts)
    const newContact = {
      id: generateId(),
      name: name,
      email: email,
      phone: phoneNumberFormatter(phone)
    }
    parsedContactsData.push(newContact)
    const parsedData = JSON.stringify(parsedContactsData)
    fs.writeFile(PATH_DB, parsedData, 'utf8')
    const newContacts = await fs.readFile(PATH_DB, 'utf-8')
    const newParsedContactsData = JSON.parse(newContacts)
    const idCreatedContact = parseInt(newContact.id) ? parseInt(newContact.id) : newContact.id
    const [filteredContact] = newParsedContactsData.filter(elem => elem.id === idCreatedContact)
    if (Object.keys(filteredContact).length === 4) {
      return filteredContact
    } else {
      return
    }
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = addContactModel
