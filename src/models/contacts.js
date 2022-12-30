const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('models', 'contacts.json')

const changeContactsData = async (newList) => {
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
}

const getContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, 'utf8')
    return JSON.parse(contactList)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactList = JSON.parse(data)
    const contact = contactList.find(contact => contact.id === contactId)
    return contact
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactList = JSON.parse(data)
    const contactDelete = await getContactById(contactId)
    if (!contactDelete) return null
    const newContactList = contactList.filter(contact => contact.id !== contactDelete.id)
    changeContactsData(newContactList)
    return
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  const newContact = {
    id: uuidv4(),
    ...body
  }
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactList = JSON.parse(data)
    contactList.push(newContact)
    changeContactsData(contactList)
    return newContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactList = JSON.parse(data)
    const updatedContact = contactList.find(contact => contact.id === contactId)
    if (!updatedContact) return null
    updatedContact.name = body.name
    updatedContact.email = body.email
    updatedContact.phone = body.phone
    changeContactsData(contactList)
    return updatedContact
}



module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
