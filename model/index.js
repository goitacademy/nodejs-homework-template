const fs = require('fs/promises')
const path = require('path')

const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const listData = await fs.readFile(contactsPath)
  if (!listData) {
    return null
  }
  const contacts = JSON.parse(listData)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find(contact => String(contact.id) === contactId)
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => String(contact.id) === contactId)
  if (idx === -1) {
    return null
  };
  const newList = contacts.filter((_, index) => index !== idx)
  await fs.writeFile(contactsPath, JSON.stringify(newList))
  return contacts[idx]
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { ...body, id: v4() }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => String(contact.id) === contactId)
  if (idx === -1) {
    return null
  };
  contacts[idx] = { ...body, id: contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
