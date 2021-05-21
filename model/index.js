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
    const contactsListUpdated = JSON.stringify(contacts.filter(contact => contact.id !== Number(contactId)))
    fs.writeFile('./model/contacts.json', contactsListUpdated, (err) => {
      if (err) {
        return err.message
      }
    })
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
  await fs.readFile(contacts, (err, data) => {
    try {
      const contacts = JSON.parse(data)
      const contactToUpdate = contacts.find(contact => contact.id === contactId)
      const updatedContact = { ...body, ...contactToUpdate }
      const allContacts = contacts.filter(contact => contact.id !== contactId)
      const updatedContacts = JSON.stringify([...allContacts, updatedContact])
      fs.writeFile(contacts, updatedContacts, (err) => {
        if (err) {
          return err.message
        }
      })
    } catch {
      return err.message
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
