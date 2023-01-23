const fs = require('fs/promises')
const path = require("path");
const contacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contacts)
  const allContacts = JSON.parse(data)
  return allContacts
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const contact = allContacts.filter((el) => el.id === contactId)
  if (!contact) {
    return null
  }
  return contact
}

const addContact = async (data) => {
const allContacts = await listContacts()
  const newContact = {...data }
  allContacts.push(newContact)
  await fs.writeFile(contacts, JSON.stringify(allContacts))
  return newContact
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const index = allContacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
    return null
  }
  allContacts[index] = { id: contactId, ...body }
  await fs.writeFile(contacts, JSON.stringify(allContacts))
  return allContacts[index]
}


const removeContact = async (contactId) => {
  const allContacts = await listContacts()
  const index = allContacts.findIndex((el) => el.id === String(contactId))
  if (index === -1) {
    return null
  }
  const [removedContact] = allContacts.splice(index, 1)
  await fs.writeFile(contacts, JSON.stringify(allContacts))
  return removedContact
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
