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
    const error = {
      status: 'Contact not found'
    }
    return error
  }
  const newContactList = contacts.filter(contact => contact.id !== contactId)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContactList, null, 2))
  return deletedContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await contactsPath()

  const isContackAlreadyExist = contacts.some(contact => contact.name === name || contact.email === email || contact.phone === phone)

  if (!isContackAlreadyExist) {
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
  const error = {
    status: 'BadRequest',
    code: 400,
    message: 'Contact already exist'
  }
  return error
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await contactsPath()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    const error = {
      status: 'Contact not found'
    }
    return error
  }
  const nonRenewableСontacts = contacts.filter(item => item.id !== contactId)
  const isContackAlreadyExist = nonRenewableСontacts.some(contact => contact.name === name || contact.email === email || contact.phone === phone)
  if (isContackAlreadyExist) {
    const error = {
      status: 'BadRequest',
      code: 400,
      message: 'Contact already exist'
    }
    return error
  }
  contacts[idx] = { id: contactId, name, email, phone }
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
