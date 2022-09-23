const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === contactId)
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  const [removeContact] = contacts.splice(idx, 1)
  await updateContacts(contacts)
  return removeContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === id)
  if (index === -1) {
    return null
  }
  contacts[index] = { id, name, email, phone }
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}