const fs = require('fs/promises')
const contacts = require('./contacts.json')

const listContacts = async () => {
  await fs.readFile(contacts, (err, data) => {
    try {
      const contactsList = JSON.parse(data)
      return contactsList
    } catch {
      return err.message
    };
  })
}

const getContactById = async (contactId) => {
  await fs.readFile(contacts, (err, data) => {
    try {
      const contact = JSON.parse(data).find(contact => contact.id === contactId)
      return contact
    } catch {
      return err.message
    }
  })
}

const removeContact = async (contactId) => {
  await fs.readFile(contacts, (err, data) => {
    try {
      const contactsListUpdated = data.filter(contact => contact.id !== contactId)
      fs.writeFile(contacts, contactsListUpdated, (err) => {
        if (err) {
          return err.message
        }
      })
    } catch {
      return err.message
    }
  })
}

const addContact = async (body) => {
  await fs.readFile(contacts, (err, data) => {
    try {
      const contacts = JSON.parse(data)
      const id = contacts[contacts.length - 1].id + 1
      const contactsList = JSON.stringify([...data, { id, ...body }])
      const response = JSON.stringify({ id, ...body })
      fs.writeFile(contacts, contactsList, (err) => {
        if (err) {
          return err.message
        }
        return response
      })
    } catch {
      return err.message
    }
  })
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
