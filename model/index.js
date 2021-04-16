const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require('path')
const { v4: uuid } = require('uuid');

const contactsPath = path.join('./model/contacts.json')

async function getAllContacts() {
  return JSON.parse(await fs.readFile(contactsPath, (err, data) => {    
      if (err) return console.error(err.message)    
      return data
    }))
}

const listContacts = async () => {
  try {
    return await getAllContacts()
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    return contacts.find(({ id }) => id.toString() === contactId)
  } catch (err) {
    console.error(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const foundContact = contacts.find(({ id }) => id.toString() === contactId)
    const filteredContacts = contacts.filter(({ id }) => id.toString() !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
      if (err) return console.error(err.message)
    })
    return foundContact
  } catch (err) {
    console.error(err.message)
  }
}

const addContact = async (body) => {
  try {
  const id = uuid()
  const contact = {
   id,
   ...body
  }
  const contacts = await getAllContacts()
  contacts.push(contact)
  fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
    if (err) return console.error(err.message)
  })
    return contact
  } catch (err) {
    console.error(err.message)
  }
}

const updateContact = async (contactId, body) => {
   try {
    const contacts = await getAllContacts()
    const foundContact = contacts.find(({ id }) => id.toString() === contactId)
    const filteredContacts = contacts.filter(({ id }) => id.toString() !== contactId)
    const data = Object.assign(foundContact, body)
    if (data.id) {
      filteredContacts.push(data)
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) return console.error(err.message)
      })
    }
    return data.id ? data : null
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
