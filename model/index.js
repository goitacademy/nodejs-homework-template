const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, 'contacts.json')

async function updateContactsDb(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find((el) => el.id.toString() === contactId)
  if (!contact) {
    return null
  }
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const indexToRemove = contacts.findIndex(
    (el) => el.id.toString() === contactId,
  )
  if (indexToRemove < 0) {
    return null
  }
  const contact = contacts[indexToRemove]
  contacts.splice(indexToRemove, 1)
  await updateContactsDb(contacts)
  return contact
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const id = nanoid(4)
  const newContact = {
    ...body,
    id,
  }
  contacts.push(newContact)
  await updateContactsDb(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contact = contacts.find((el) => el.id.toString() === contactId)
  if (!contact) {
    return null
  }
  const updatedContact = {
    ...contact,
    ...body,
  }
  contacts.push(updatedContact)
  await updateContactsDb(contacts)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
