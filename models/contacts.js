const fs = require('fs/promises')
const contactsPath = './models/contacts.json'

const getJsonContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = await JSON.parse(data)
  return contacts
}

const listContacts = async () => {
  const contacts = await getJsonContacts()
  console.table(contacts)

  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await getJsonContacts()

  const contact = contacts.find(
    (contact) => Number(contact.id) === Number(contactId)
  )

  console.table(contact)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await getJsonContacts()

  const isInContacts = () =>
    contacts.find((contact) => Number(contact.id) === Number(contactId))

  if (!isInContacts()) return

  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts?.filter((contact) => Number(contact.id) !== Number(contactId))
    )
  )

  const newContacts = await getJsonContacts()
  console.table(newContacts)
  return newContacts
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
