const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactsFilePath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  return contacts.find((contact) => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const changeContact = contacts.filter((contact) => contact.id === contactId)
  await fs.writeFile(contactsFilePath, JSON.stringify(changeContact, null, 2))
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { id: nanoid(), ...body }
  contacts.push(newContact)
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2))
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index === -1) {
    return null
  }
  contacts[index] = { ...contacts[index], ...body }
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
