const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const { v4 } = require('uuid')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id.toString() === contactId.toString())

    if (index === -1) {
      return false
    }
    return contacts[index]
  } catch (error) {
    console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id.toString() === contactId.toString())
    if (index === -1) {
      return false
    }

    contacts.splice(index, 1,)
    const strContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, strContacts)
    return true
  } catch (error) {
    console.log(error.message)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    }
    const contacts = await listContacts()
    const newContacts = [...contacts, newContact]
    const strContacts = JSON.stringify(newContacts)
    await fs.writeFile(contactsPath, strContacts)

    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const index = contacts.findIndex((contact) => contact.id === contactId)
    if (index === -1) {
      return false
    }

    for (const key in body) {
      contacts[index][key] = body[key]
    }

    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[index]
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
