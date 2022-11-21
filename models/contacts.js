const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../models/contacts.json')

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath))
}

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  return contacts.find(item => item.id === contactId)
}

const addContact = async (body) => {
  if (body.name && body.email && body.phone) {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    contacts.push({ id: `${contacts.length + 1}`, ...body })
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[contacts.length - 1]
  } else {
    return false
  }
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  if (contacts.find(item => item.id === contactId)) {
    await fs.writeFile(contactsPath, JSON.stringify(
      contacts.filter(item => item.id !== contactId)
    ))
    return true
  } else {
    return false
  }
}

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  const IDinArr = contacts.findIndex(item => item.id === contactId)
  if (IDinArr + 1) {
    contacts[IDinArr] = {...contacts[IDinArr], ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[IDinArr]
  } else {
    return false
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
