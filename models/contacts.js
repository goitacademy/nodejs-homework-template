const fs = require('fs/promises')
const path = require("path")
const {v4} = require("uuid")

const contactsPath = path.join(__dirname, "contacts.json")

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (id) => {
  const contacts = await getAllContacts()
  const result = contacts.find((contact) => contact.id === id)
    if(!result) {
      return null
    }
  return result
}

const removeContactById = async (id) => {
  const contacts = await getAllContacts()
  const index = contacts.findIndex((contact) => contact.id === id)
    if(index === -1) {
      return null
    }
  const contactToRemove = contacts.splice(index, 1)
  await updateContacts(contacts)
  return contactToRemove
}

const addContact = async (data) => {
  const newContact = { id: v4(), ...data}
  const contacts = await getAllContacts()
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContactById = async ({id, name, email, phone}) => {
  const contacts = await getAllContacts()
  const index = contacts.findIndex((contact) => contact.id === id)
    if(index === -1) {
      return null
    }
  contacts[index] = {id, name, email, phone}
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
}
