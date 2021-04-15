const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)

  return JSON.parse(data.toString())
}

const getContactById = async contactId => {
  const data = await fs.readFile(contactsPath)

  return JSON.parse(data.toString()).find(({ id }) => id === contactId)
}

const removeContact = async contactId => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())
  const updatedContacts = contacts.filter(({ id }) => id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, '\t'))

  if (updatedContacts.length === contacts.length) return false
  return true
}

const addContact = async body => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())
  const id = contacts[contacts.length - 1].id + 1

  const newContact = { id, ...body }
  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))

  return newContact
}

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())

  const updatedContacts = contacts.map(contact => {
    if (contact.id === contactId) {
      return { ...contact, ...body }
    }
    return contact
  })
  const newContact = updatedContacts.find(({ id }) => id === contactId)
  console.log(newContact)
  if (newContact) {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, '\t')
    )
    return newContact
  }
  return null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
