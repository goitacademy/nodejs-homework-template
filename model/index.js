const fs = require('fs').promises
const path = require('path')
const { uid } = require('uid')

const contactsPath = path.resolve('model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contact
  } catch (error) {
    throw new Error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const updatedContacts = contacts.filter(
      ({ id }) => id.toString() !== contactId
    )
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
    return true
  } catch (error) {
    throw new Error(error)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = {
    id: uid(),
    name,
    email,
    phone
  }
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const updatedContacts = [...contacts, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
  } catch (error) {
    throw new Error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    if (contact) {
      const updatedСontact = {
        ...contact,
        ...body
      }
      const updatedContacts = contacts.map((contact) =>
        contact.id.toString() === contactId ? updatedСontact : contact
      )
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
      return updatedСontact
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
