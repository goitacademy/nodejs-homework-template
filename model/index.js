const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contactsList = JSON.parse(data)
  return contactsList
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts()
  const selectContact = contactsList.find(
    (item) => item.id === Number(contactId)
  )

  if (!selectContact) {
    return null
  }

  return selectContact
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const contactIndex = contactsList.findIndex(
    (item) => item.id === Number(contactId)
  )

  if (contactIndex === -1) {
    return null
  }

  const removedContact = await contactsList.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList))

  return removedContact
}

const addContact = async (body) => {
  const contactsList = await listContacts()

  function getNextUniqId(arr) {
    return Math.max(...arr.map((contact) => contact.id)) + 1
  }

  const addNewContact = {
    id: getNextUniqId(contactsList),
    ...body,
  }

  contactsList.push(addNewContact)

  await fs.writeFile(contactsPath, JSON.stringify(contactsList))

  return addNewContact
}

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts()
  const contactIndex = await contactsList.findIndex(
    (item) => item.id === Number(contactId)
  )

  if (contactIndex === -1) {
    return null
  }

  contactsList[contactIndex] = { ...contactsList[contactIndex], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contactsList))
  return contactsList[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
