const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
const fs = require('fs').promises
const path = require('path')

const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, './contacts.json')

const { nanoid } = require('nanoid')

const listContacts = async () => {
  try {
    const rawContacts = await fs.readFile(contactsPath)
    const allContacts = JSON.parse(rawContacts)

    return allContacts
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contact = await listContacts().then((contacts) => contacts.filter(contact => contact.id === contactId))

    return contact
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts()
    const index = allContacts.findIndex((contact) => contact.id.toString() === contactId.toString())
    if (index === -1) {
      return false
    }
    allContacts.splice(index, 1,)
    const updatedContacts = JSON.stringify([...allContacts])
    fs.writeFile(contactsPath, updatedContacts)
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body

    const newContact = { id: nanoid(), name, email, phone }

    const allContacts = await listContacts()

    const updateContacts = JSON.stringify([newContact, ...allContacts])
    fs.writeFile(contactsPath, updateContacts)
    return newContact
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const index = allContacts.findIndex((contact) => contact.id === contactId)
  if (index === -1) {
    return false
  }

  let updatedContact = allContacts.find((contact) => contact.id === contactId)
  updatedContact = { ...allContacts[index], ...body }
  allContacts.splice(index, 1, updatedContact)
  const updatedContacts = JSON.stringify([...allContacts])
  fs.writeFile(contactsPath, updatedContacts)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};