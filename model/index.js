const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'model', 'contacts', 'db', 'contacts.json')

const updateContacts = async (contacts) => {
  const newContact = await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  return contacts[idx]
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await updateContacts(contacts)
  return true
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newId = contacts.length + 1
  const newContact = { id: newId, body }
  console.log(newContact)
  contacts.push(newContact)
  await updateContacts(contacts)
  return contacts
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await updateContacts(contacts)
  return contacts[idx]
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}

module.exports = contactsOperations
