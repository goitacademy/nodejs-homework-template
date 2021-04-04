const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

async function readFile(path) {
  const fileData = await fs.readFile(path, 'utf-8')
  const contacts = JSON.parse(fileData)

  return contacts
}

const listContacts = async () => {
  const contacts = await readFile(contactsPath)

  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await readFile(contactsPath)
  const contact = contacts.find((el) => String(el.id) === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await readFile(contactsPath)
  const idx = contacts.findIndex((el) => String(el.id) === contactId)
  if (idx !== -1) {
    const deleteContact = contacts[idx]
    contacts.splice(idx, 1)
    console.log('Удаляем контакт', deleteContact)
    const updatedContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, updatedContacts)

    return contacts
  } else {
    return false
  }
}

const addContact = async (body) => {
  const contacts = await readFile(contactsPath)
  contacts.push(body)

  const updatedContacts = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, updatedContacts)
  return contacts
}

const updateContact = async (contactId, body) => {
  const contacts = await readFile(contactsPath)

  const updateContact = contacts.find((el) => String(el.id) === contactId)

  if (updateContact) {
    const updatedContact = { ...updateContact, ...body }

    const idx = contacts.indexOf(updateContact)

    const modifiedContacts = [...contacts.slice(0, idx), updatedContact, ...contacts.slice(idx + 1)]

    const updatedContacts = JSON.stringify(modifiedContacts)

    await fs.writeFile(contactsPath, updatedContacts)

    return updatedContact
  } else throw new Error()
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
