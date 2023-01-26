const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json')
console.log(listContacts())

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))


async function listContacts() {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === contactId)
  return result || null
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => item.id === contactId)
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1)
  await updateContacts(contacts)
  return result
}

async function addContact(data) {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}
async function updateByID(id, body) {
  const contacts = await listContacts()
  const index = contacts.findIndex((item)=> item.id === id)
  if (index === -1) {
    return null
  }
  contacts[index] = {id, ...body}
  await updateContacts(contacts)
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateByID,
}
