const path = require('path')
const fsPromises = require('fs').promises
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.resolve('model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8')
    const contacts = JSON.parse(data)
    const contact = contacts.find((contact) => String(contact.id) === contactId)
    return contact
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const newContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    )
    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts))
    return true
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const contact = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone
    }
    const data = await fsPromises.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const newContacts = [...contacts, contact]
    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts))
    return contact
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contact = contacts.find(contact => String(contact.id) === contactId)
    if (contact) {
      const upContact = Object.assign(contact, body)
      const upContacts = contacts.map(contact => {
        if (String(contact.id) === upContact.id) {
          return upContact
        }
        return contact
      })
      await fsPromises.writeFile(contactsPath, JSON.stringify(upContacts))
      return upContact
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
