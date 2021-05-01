const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../../../model', './contacts.json')
// const contacts = require(contactsPath)
require('colors')

const listContacts = async () =>
  await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data.toString()))
    .catch(handleError)

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find((el) => el.id === Number(contactId))

  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactToDelete = contacts.find((el) => el.id === Number(contactId))
  const filteredContacts = contacts.filter((el) => el.id !== Number(contactId))

  if (contactToDelete) {
    const data = JSON.stringify(filteredContacts)

    await fs
      .writeFile(contactsPath, data)
      .then(console.log('Contact removed'.green))
      .catch(handleError)
  }

  return contactToDelete
}

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || !phone) return

  const contacts = await listContacts()

  if (!contacts.find((el) => el.phone === phone)) {
    const id = getNewId(contacts)
    const newContact = { name, email, phone, id }

    contacts.push(newContact)

    await fs
      .writeFile(contactsPath, JSON.stringify(contacts))
      .then(console.log('Contact created'.green))
      .catch(handleError)

    return newContact
  } else {
    console.log('Phone number already exists'.yellow)
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contactToUpdate = contacts.find((el) => el.id === Number(contactId))
  const indexToUpdate = contacts.indexOf(contactToUpdate)

  if (!contactToUpdate) return

  if (body.name) {
    contacts[indexToUpdate].name = body.name
  }
  if (body.phone) {
    contacts[indexToUpdate].phone = body.phone
  }
  if (body.email) {
    contacts[indexToUpdate].email = body.email
  }

  const data = JSON.stringify(contacts)

  await fs
    .writeFile(contactsPath, data)
    .then(console.log('Contact updated'.green))
    .catch(handleError)

  return contactToUpdate
}

const getNewId = (arr) => {
  const randomNumber = Math.round(Math.random() * 100)

  if (arr.find((el) => el.id === randomNumber)) {
    getNewId(arr)
  }

  return randomNumber
}

const handleError = (e) => console.log('Error ', e)

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
