const fs = require('fs/promises')
const path = require('path')

const crypto = require('crypto')

// const contacts = require('./contacts.json')
const contactsPath = path.join(__dirname, './contacts.json')

const readContact = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(result)
}

// ====================================update================================
const updateContact = async (newContact) => {
  const contactStr = JSON.stringify(newContact)
  await fs.writeFile(contactsPath, contactStr)
}

// =======================================list============================
const listContacts = async () => readContact()

// =====================================get================================
const getContactById = async (contactId) => {
  const contact = await readContact()
  const result = contact.find((item) => item.id === +contactId)
  // if (!result) {
  //   return null
  // }
  return result
}
// =====================================add================================
const addContact = async (name, email, phone) => {
  const contact = await readContact()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contact.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
  return newContact
}
// =====================================remove================================
const removeContact = async (contactId) => {
  const contact = await readContact()
  const idx = contact.findIndex((item) => item.id === +contactId)
  if (idx === -1) {
    return null
  }
  const delContact = contact.splice(idx, 1)
  await updateContact(contact)
  return delContact
}

// !=====================================update by id================================
const updateContactById = async (contactId, body) => {
  const contact = await readContact()
  console.log(body)
  if (!body) {
    return null
  }
  const idx = contact.findIndex(item => item.id === +contactId)

  contact[idx] = { ...body, contactId }
  await updateContact(contact)

  return contact[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
