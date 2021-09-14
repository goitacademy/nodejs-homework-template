const fs = require('fs/promises')
const path = require('path')
const nanoid = require('nanoid')
const contactsPath = path.join(__dirname, '/contacts.json')

const getContacts = async () => await fs.readFile(contactsPath).then(JSON.parse)

const listContacts = async () => {
  try {
    return await getContacts()
  } catch (error) {
    return error.message
  }
}

const getContactById = async (contactId) => {
  const contacts = await getContacts()
  return contacts.find((contact) => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await getContacts()
  const newContacts = contacts.filter((contact) => contact.id !== contactId)
  fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return contacts.find((contact) => contact.id === contactId)
}

const addContact = async (body) => {
  const contacts = await getContacts()
  const newContact = { ...body, id: nanoid() }
  const newContacts = [...contacts, newContact]
  fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await getContacts()
  const contactToUpdate = contacts.find((contact) => contact.id === contactId)
  const updatedContact = { ...contactToUpdate, ...body }
  const newContacts = [
    ...contacts.filter((contact) => contact.id !== contactId),
    updatedContact,
  ]
  fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
