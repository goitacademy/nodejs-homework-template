const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db/contacts.json')

const getAllContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    const parseContacts = JSON.parse(contacts)
    return parseContacts
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const contactById = contacts.find(contact => contact.id === Number(contactId))
    if (!contactById) {
      return null
    }
    return contactById
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const newContacts = contacts.filter(contact => contact.id !== Number(id))
    await updateContacts(newContacts)
    return newContacts
  }
  catch (error) {
    throw error
  }
}

const addContact = async (body) => {
  try {
    const contacts = await getAllContacts()
    const newContact = { ...data, id: v4() }
    const newContacts = [...contacts, newContact]
    await updateContacts(newContacts)
    console.log(`newContact`, newContact)
    return newContact
  }
  catch (error) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  return await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
