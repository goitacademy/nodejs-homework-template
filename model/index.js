const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
// const contacts = require("./contacts.json");

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async contactId => {
  const contacts = await listContacts()
  return contacts.find(contact => contact.id === contactId)
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const id = uuidv4()
  await fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...contacts,
      {
        id: id,
        name: name,
        email: email,
        phone: phone,
      },
    ])
  )
  const newContact = await getContactById(id)
  return newContact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const newContacts = contacts.filter(contact => contact.id !== contactId)
  if (newContacts.length !== contacts.length) {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return true
  } else return false
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  const contacts = await listContacts()
  let data
  const newContacts = contacts.map(contact => {
    if (contact.id === contactId) {
      data = true
      return {
        ...contact,
        name: name || contact.name,
        email: email || contact.email,
        phone: phone || contact.phone,
      }
    } else return contact
  })
  if (data) {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    const newContact = await getContactById(contactId)
    return newContact
  } else return false
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
