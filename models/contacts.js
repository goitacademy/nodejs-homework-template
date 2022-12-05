const fs = require('fs/promises')
const path = require("path")
const { v4 } = require("uuid")

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
}

const getContactById = async (id) => {
  const contacts = await listContacts()
  const result = contacts.find(item => item.id === id)
  if (!result) {
    return null
  }
  return result
}

const removeContact = async (id) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
      return null
  }
  const newContacts = contacts.filter((_,index)=> index != idx)
  await updateContacts(newContacts)
  return contacts[idx]
}

const addContact = async ({name, email, phone}) => {
  const newId = v4()
  const contacts = await listContacts()
  const newContacts = {id: newId, name, email, phone}
  contacts.push(newContacts)
  await updateContacts(contacts)
  return newContacts
}

const updateByContactId = async (id, {name, email, phone}) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, name, email, phone }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateByContactId,
}