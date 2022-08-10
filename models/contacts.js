const fs = require('fs/promises')
const { v4 } = require('uuid')
const path = require('path')

const contactsPath = path.join(`${__dirname}`, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const products = await listContacts()
  const result = products.find((item) => item.id === contactId)

  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()

  const idx = contacts.findIndex((item) => item.id === contactId)
  const deletedContact = contacts[idx]
  if (idx !== -1) {
    contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
  }
  return deletedContact
}

const addContact = async (body) => {
  const contactsAll = await listContacts()
  const { name, email, phone } = body
  const newContact = { name, email, phone, id: v4() }
  contactsAll.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsAll))

  return newContact
}

const updateContact = async (contactId, body) => {
  const contactsAll = await listContacts()

  const contactIndex = contactsAll.findIndex(
    (product) => product.id === contactId,
  )

  if (contactIndex !== -1) {
    const { name, email, phone } = body
    contactsAll[contactIndex].name = name
    contactsAll[contactIndex].email = email
    contactsAll[contactIndex].phone = phone

    await fs.writeFile(contactsPath, JSON.stringify(contactsAll, null, 2))
    return contactsAll[contactIndex]
  } else {
    return null
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
