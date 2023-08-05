const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (err) {
    console.log(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    return contacts.find((contact) => contact.id === contactId)
  } catch (err) {
    console.log(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const index = contacts.findIndex((contact) => contact.id === contactId)
    contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
  } catch (err) {
    console.log(err)
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const newContact = {
      id: contacts.length + 1,
    ...body,
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
  } catch (err) {
    console.log(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const index = contacts.findIndex((contact) => contact.id === contactId)
    contacts[index] = {
    ...contacts[index],
    ...body,
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
