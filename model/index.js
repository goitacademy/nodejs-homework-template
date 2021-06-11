const fs = require('fs').promises
const path = require('path')
const { uuid } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  } catch (e) {
    throw new Error(e)
  }
}

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    const requiredContact = contacts.find(
      contact => contact.id.toString() === contactId
    )

    return requiredContact
  } catch (e) {
    throw new Error(e)
  }
}

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    if (contacts.some(contact => contact.id.toString() === contactId)) {
      const changedContacts = contacts.filter(
        contact => contact.id.toString() !== contactId
      )

      await fs.writeFile(
        contactsPath,
        JSON.stringify(changedContacts, null, 2)
      )

      return true
    } else {
      return null
    }
  } catch (e) {
    throw new Error(e)
  }
}

const addContact = async body => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    const newContact = {
      id: uuid(),
      ...body,
    }

    contacts.push(newContact)

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    return newContact
  } catch (e) {
    throw new Error(e)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)

    const requiredContact = contacts.find(
      contact => contact.id.toString() === contactId
    )

    if (!requiredContact) {
      return null
    }

    const changedContact = {
      ...requiredContact,
      ...body,
    }

    const newContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return changedContact
      }
      return contact
    })

    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))

    return changedContact
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
