const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join('./model/contacts.json')
const {v4: uuid} = require('uuid')

const listContacts = async () => {
  try {
      const response = await fs.readFile(contactsPath, 'utf-8')
      const contacts = JSON.parse(response)
      return contacts
    } catch (err) {
      console.error(err.message)
    }
}

const addContact = async (body) => {
  try {
    const id = uuid()

    const record = {
      id,
      ...body,
    }
    const response = await fs.readFile(contactsPath, 'utf-8')
    const parsedContacts = JSON.parse(response)
    parsedContacts.push(record)
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts, null, 2))
    return record
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {
    try {
    const response = await fs.readFile(contactsPath, 'utf-8')
    const parsedContacts = JSON.parse(response)

    const contact =  parsedContacts.find(({ id }) => id === Number(contactId))
    
    return contact

  } catch (err) {
    console.error(err.message)
  }
}


const removeContact = async (contactId) => {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8')
    const parsedContacts = JSON.parse(response)

    const newList = parsedContacts.filter(contact =>  contact.id !== contactId )

    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))

    return newList

  } catch (err) {
    console.error(err.message)
  }
}


const updateContact = async (contactId, body) => {
  try {
      const response = await fs.readFile(contactsPath, 'utf-8')
      const parsedContacts = JSON.parse(response)

      const contact = parsedContacts.find(({ id }) => id === contactId)
      const record = Object.assign(contact, body)

      await fs.writeFile(contactsPath, JSON.stringify(record, null, 2));

      return record.id ? record : null;
    } catch (err) {
      console.error(err.message)
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
