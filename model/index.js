const fs = require('fs/promises')
const path = require('path')
const contacts = require('./contacts.json')
const filePath = path.join(__dirname, 'contacts.json')

const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((contact) => contact.id === Number(contactId))
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const updateContacts = contacts.filter((contact) => contact.id !== Number(contactId))
  return updateContacts
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = {
    ...body,
    id:
      uuidv4()
  }
  contacts.push(newContact)
  return newContact
}

const updateById = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, contactId }
  await updateContacts(contacts)
  return contacts[idx]
}

const updateContacts = async(contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById
}
