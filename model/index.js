const fs = require('fs/promises')
const { v4 } = require('uuid')
// const contacts = require('./contacts.json')

const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.error(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contactByID = contacts.find((el) => el.id === contactId)
    if (!contactByID) {
      return null
    }
    return contactByID
  } catch (error) {
    console.error(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex((item) => item.id === contactId)
    if (idx === -1) {
      return null
    }

    const removeContact = contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return removeContact
  } catch (error) {
    console.error(error.message)
  }
}

const addContact = async (body) => {
  try {
    const newContact = { id: v4(), ...body }
    const contacts = await listContacts()
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

const updateContact = async ({ contactId, name, phone, email }) => {
  console.log('contactId, name, phone, email', contactId, name, phone, email)
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex((item) => item.id === contactId)
    if (idx === -1) {
      return null
    }
    contacts[idx] = { contactId, name, phone, email }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[idx]
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
