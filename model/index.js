const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
// const contacts = require("./contacts.json");
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const contact = contactsList.find(({ id }) => id.toString() === contactId)

  if (!contact) {
    return
  }
  return contact
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const index = contactsList.findIndex(({ id }) => id.toString() === contactId)

  if (index === -1) {
    return
  }

  const removedContact = contactsList[index]
  const filteredContacts = contactsList.filter(
    ({ id }) => id.toString() !== contactId
  )
  await rewriteFile(filteredContacts)
  return removedContact
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const newContact = { id: v4(), name, email, phone }
  const contactsList = await listContacts()
  const updateContactsList = [...contactsList, newContact]
  await rewriteFile(updateContactsList)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId)
  if (!contact) {
    return
  }
  const contactsList = await listContacts()

  const updatedContact = { ...contact, ...body }
  const updateContactsList = [
    ...contactsList.filter(({ id }) => id.toString() !== contactId),
    updatedContact,
  ]
  await rewriteFile(updateContactsList)
  return updatedContact
}

async function rewriteFile(contacts) {
  const stringifiedContacts = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, stringifiedContacts)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
