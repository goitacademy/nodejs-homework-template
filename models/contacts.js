const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const result = contacts.find((item) => item.id === contactId)
    if (!result) {
      return null
    }
    return result
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  const [delateContact] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return delateContact
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts()
    const { name, email, phone } = body
    const newContact = { name, email, phone, id: v4() }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex((item) => item.id === contactId)
    if (idx === -1) {
      return null
    }
    const { name, email, phone } = body
    contacts[idx] = { id: contactId, name, email, phone }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[idx]
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
