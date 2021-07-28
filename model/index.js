const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  } catch (error) {
    return error
  }
}

const getContactById = async contactId => {
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(({ id }) => id === Number(contactId))
    return findContact
  } catch (error) {
    return error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const filterContacts = contacts.filter(({ id }) => id !== Number(contactId))
    await updateContactList(filterContacts)
  } catch (error) {
    return error
  }
}

const addContact = async (body) => {
  const id = v4()
  const contact = {
    id: id,
    name: body.name,
    email: body.email,
    phone: body.phone,
  }

  try {
    const contacts = await listContacts()
    const newContact = [...contacts, contact]
    await updateContactList(newContact)
  } catch (error) {
    return error
  }
}

const updateContactList = async (contacts) => {
  const str = JSON.stringify(contacts)
  try {
    await fs.writeFile(contactsPath, str)
  } catch (error) {
    return error
  }
}


const updateContact = async (contactId, body) => {
  try {
    const contactList = await listContacts()
    const initialContact = await getContactById(contactId)
    const updatedInitialContact = { ...initialContact, ...body }
    const updateContactList = contactList.map(({ id }) => id === Number(contactId) ? updatedInitialContact : null)
    await fs.writeFile('./contacts.json', JSON.stringify(updateContactList, null, 2))
    return updatedInitialContact
  } catch (error) {
    return error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
