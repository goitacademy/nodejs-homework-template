const fs = require('fs').promises
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8')
  const allContacts = await JSON.parse(data)
  return allContacts
}

async function getContactById(contactId) {
  const allContacts = await listContacts()
  const specifiedContact = allContacts.find(contact => String(contact.id) === contactId)
  if (!specifiedContact) {
    return null
  };
  return specifiedContact
}
async function removeContact(contactId) {
  const allContacts = await listContacts()
  const specifiedContactIndex = allContacts.findIndex(contact => String(contact.id) === contactId)
  if (specifiedContactIndex === -1) {
    return null
  }
  const contactsListWithoutDeleted = allContacts.filter(contact => String(contact.id) !== contactId)
  const contacsJsonString = JSON.stringify(contactsListWithoutDeleted)
  await fs.writeFile(contactsPath, contacsJsonString)
  return allContacts[specifiedContactIndex]
}

async function addContact({ name, email, phone }) {
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    id: v4()
  }
  const allContacts = await listContacts()
  allContacts.push(newContact)
  const contacsJsonString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contacsJsonString)
  return newContact
}

async function updateContact(contactId, newData) {
  const allContacts = await listContacts()
  const specifiedContactIndex = allContacts.findIndex(contact => String(contact.id) === contactId)
  if (specifiedContactIndex === -1) {
    return null
  }
  allContacts[specifiedContactIndex] = {
    ...allContacts[specifiedContactIndex],
    newData
  }
  const contacsJsonString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contacsJsonString)
  return allContacts[specifiedContactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
