const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  }
  catch(error) {
      console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contact = JSON.parse(data)
    return contact.filter(el => el.id === contactId)
  }
  catch(error) {
      console.log(error.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const newContacts = contacts.filter(el => el.id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  }
  catch(error) {
    console.log(error.message)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body 
  try {
    if (name && email && phone) {
      const data = await fs.readFile(contactsPath)
      const contacts = JSON.parse(data)
      const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone
      }
      contacts.push(newContact)
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return newContact
    } else {
      const requiredFields = ["name", "email", "phone"]
      return requiredFields.map(el => Object.keys(body).includes(el) ? "" : el).join(" ")
    }
  }
  catch(error) {
    console.log(error.message)
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  try {
    if (Object.keys(body)[0]) {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
      return contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2))
    } else {
      return undefined
    }
  }
  catch (error) {
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