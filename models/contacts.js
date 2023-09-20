const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const contactsPath = './models/contacts.json'

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  } catch (err) {
    throw err
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(({ id }) => id.toString() === contactId)
    return contact
  } catch (err) {
    throw err
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const indexToRemove = contacts.findIndex((contact) => contact.id.toString() === contactId)

    if (indexToRemove !== -1) {
      contacts.splice(indexToRemove, 1)
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return true
    } else {
      return false
    }
  } catch (err) {
    throw err
  }
}

const addContact = async (body) => {
  const contscts = await listContacts()

  const newContact = {
    id: uuidv4(),
    ...body,
  }

  contscts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contscts))

  return newContact
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId)

    if (contactIndex === -1) {
      return null
    }

    contacts[contactIndex] = { ...contacts[contactIndex], ...body }

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[contactIndex]
  } catch (err) {
    throw err
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
