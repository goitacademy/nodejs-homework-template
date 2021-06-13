const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (e) {
    console.log(e)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const foundContact = contacts.find(({ id }) => id === contactId)
    return foundContact
  } catch (e) {
    console.log(e)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const foundContact = await getContactById(contactId)
    const filteredContacts = contacts.filter(({ id }) => id !== contactId)
    await fs.writeFile(contactsPath, `${JSON.stringify(filteredContacts, null, 2)}`)
    return foundContact
  } catch (e) {
    console.log(e)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const contact = {
      id: uuidv4(),
      ...body
    }
    fs.writeFile(contactsPath, `${JSON.stringify([contact, ...contacts], null, 2)}`)
    return contact
  } catch (e) {
    console.log(e)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const modifiedContact = await getContactById(contactId)
    const updatedContact = Object.assign(modifiedContact, body)
    const updatedContacts = contacts.map((contact) => {
      return contact.id === contactId ? updatedContact : contact
    })
    await fs.writeFile(contactsPath, `${JSON.stringify(updatedContacts, null, 2)}`)
    return updatedContact
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}