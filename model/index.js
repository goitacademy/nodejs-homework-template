const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('model/contacts.json')

const getAllContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    const parseContacts = JSON.parse(contacts)
    return parseContacts
  } catch (error) {
    console.log(error.message)
    throw error
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
    console.log('error', error)
    throw error
  }
}

const updateContact = async (newContacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts()
    const newContacts = contacts.filter(contact => contact.id !== Number(contactId))
    await updateContact(newContacts)
    return newContacts
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

const addContact = async (data) => {
  try {
    const contacts = await getAllContacts()
    const newContact = { ...data, id: v4() }
    const newContacts = [...contacts, newContact]
    await updateContact(newContacts)
    console.log('newContact', newContact)
    return newContact
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

const updateContactById = async (contactId, data) => {
  const contacts = await getAllContacts()
  const idx = contacts.findIndex(contact => contact.id === Number(contactId))
  if (idx === -1) {
    return null
  }
  const newContact = { ...contacts[idx], ...data }
  console.log('newContact', newContact)
  contacts[idx] = newContact
  await updateContact(contacts)
  return newContact
}

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContact,
}
