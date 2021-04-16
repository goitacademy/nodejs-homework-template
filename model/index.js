const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require('path')
const { v4: uuid } = require('uuid');

const contactsPath = path.join('./model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, (err, data) => {    
        if (err) return console.error(err.message)    
        return data 
      }
    )
    return JSON.parse(data)
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
  const contacts = JSON.parse(await fs.readFile(contactsPath, (err, data) => {    
      if (err) return console.error(err.message)    
      return data
    }
  ))
    const foundContact = await contacts.find(({ id }) => id.toString() === contactId)
    return foundContact
  } catch (err) {
    console.error(err.message)
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try {
  const id = uuid()
  const contact = {
   id,
   ...body
  }
  const contacts = JSON.parse(await fs.readFile(contactsPath, (err, data) => {    
        if (err) return console.error(err.message)    
        return data
      }
  ))
  contacts.push(contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
    if (err) return console.error(err.message)
  })
    return contact
  } catch (err) {
    console.error(err.message)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
