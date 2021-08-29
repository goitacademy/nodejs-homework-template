const fs = require('fs/promises')
const path = require('path')
// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const parseDate = await JSON.parse(data)
    return parseDate
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (id) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(item => {
      if (typeof (item.id) === 'number') {
        return `${item.id}` === id
      }
      return item.id === id
    })
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    return error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(item => item.id === contactId)
    if (!contact) {
      return null
    }
    const indx = contacts.indexOf(contact)
    const newContacts = contacts.filter(item => item.id !== contactId)
    console.log(contacts[indx])

    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return contacts[indx]
  } catch (error) {
    return error
  }
}

const addContact = async (additionContact) => {
  try {
    const contacts = await listContacts()
    const newContacts = [...contacts, additionContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return additionContact
  } catch (error) {
    return error
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const indx = contacts.findIndex(item => item.id === contactId)
    if (indx === -1) {
      return null
    }
    contacts[indx] = { ...contacts[indx], ...body }

    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[indx]
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
