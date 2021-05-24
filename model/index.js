const fs = require('fs/promises')
const contacts = require('./contacts.json')

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  try {
    const contact = contacts.find(contact => contact.id === Number(contactId))
    return contact
  } catch {
    return {}
  }
}

const removeContact = async (contactId) => {
  try {
    const contact = contacts.find(contact => contact.id === Number(contactId))
    const contactsList = contacts.filter(contact => contact.id !== Number(contactId))
    const contactsListUpdated = JSON.stringify(contactsList)
    fs.writeFile('./model/contacts.json', contactsListUpdated, (err) => {
      if (err) {
        return err.message
      }
    })
    return contact
  } catch {
    return {}
  }
}

const addContact = async (body) => {
  try {
    const id = contacts[contacts.length - 1].id + 1
    const contact = { id, ...body }
    const contactsList = JSON.stringify([...contacts, contact])
    const response = contact
    fs.writeFile('./model/contacts.json', contactsList, (err) => {
      if (err) {
        return err.message
      }
    })
    return response
  } catch {
    return {}
  }
}

const updateContact = async (contactId, body) => {
  try {
    const test = await fs.readFile('./model/contacts.json', (err, data) => {
      if (err) {
        return err.message
      }
    })
    const contactsList = JSON.parse(test)
    const contactToUpdate = contactsList.find(contact => contact.id === Number(contactId))
    if (contactToUpdate) {
      const updatedContact = { ...contactToUpdate, ...body }
      const allContacts = contacts.filter(contact => contact.id !== Number(contactId))
      const updatedContacts = JSON.stringify([...allContacts, updatedContact])
      fs.writeFile('./model/contacts.json', updatedContacts, (err) => {
        if (err) {
          return err.message
        }
      })
      return updatedContact
    }
  } catch {
    return {}
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
