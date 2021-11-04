const fs = require('fs/promises')
const path = require('path')

const contactsPath = async () => {
  const result = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf8')
  return JSON.parse(result)
}

const listContacts = async () => {
  return await contactsPath()
}

const getContactById = async (contactId) => {
  const contacts = await contactsPath()
  const [result] = contacts.filter(contact => contact.id === contactId)
  return result
}

const removeContact = async (contactId) => {
  const contacts = await contactsPath()
  const [deletedContact] = contacts.filter(contact => contact.id === contactId)

  if (!deletedContact) {
    return null
  }
  const newContactList = contacts.filter(contact => contact.id !== contactId)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContactList, null, 2))
  return deletedContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await contactsPath()

  const isContackAlreadyExist = contacts.some(contact => contact.email === email || contact.phone === phone)

  if (isContackAlreadyExist) {
    return null
  }
  const idGenerator = () => {
    const now = new Date()
    const id = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`
    return Number(id)
  }

  const newContact = {
    id: idGenerator(),
    name,
    email,
    phone
  }

  contacts.push(newContact)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await contactsPath()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return 'Contact not found'
  }
  const nonRenewableСontacts = contacts.filter(item => item.id !== contactId)
  const isContackAlreadyExist = nonRenewableСontacts.some(contact => contact.email === email || contact.phone === phone)
  if (isContackAlreadyExist) {
    return 'Contact already exist'
  }
  const createUpdatedContact = (name = contacts[idx].name, email = contacts[idx].email, phone = contacts[idx].phone) => {
    return {
      id: contactId,
      name,
      email,
      phone
    }
  }
  contacts[idx] = createUpdatedContact(name, email, phone)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
// {name = contacts[idx].name}, {email= contacts[idx].email}, {phone= contacts[idx].phone }
