const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')
const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const finedContact = contacts.find(
    (contact) => String(contact.id) === contactId
  )
  return finedContact
}

const removeContact = async (contactId) => {
  const deletedContact = getContactById(contactId)
  if (deletedContact) {
    const contacts = await listContacts()
    const newContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    )
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  }
  return deletedContact
}

const addContact = async (body) => {
  const newContact = { id: uuidv4(), ...body }
  const contacts = await listContacts()
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const findContact = await getContactById(contactId)
  const updatedContact = { ...findContact, ...body }

  if (findContact) {
    const contacts = await listContacts()
    const newContacts = contacts.map((contact) => (String(contact.id) === contactId ? updatedContact : contact))
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
    return updatedContact
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
