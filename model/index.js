const path = require('path')

const fs = require('fs').promises
const contactsPath = path.resolve('model/contact.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    // console.log(JSON.parse(data))
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
}

// const getContactById = async contactId => { }

// const removeContact = async contactId => { }

// const addContact = async body => { }

// const updateContact = async (contactId, body) => { }
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const contactToFind = contacts.find(contact => contact.id === contactId)
    return contactToFind
  } catch (err) {
    console.error(err)
  }
}
async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const idArray = contacts.map(contact => contact.id)
    const id = idArray.reduce((accum, id) => {
      if (id > accum) {
        accum = id
      }
      return accum + 1
    })
    contacts.push({ id, name, email, phone })
    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8')
    return { id, name, email, phone }
  } catch (err) {
    console.error(err)
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const previousLength = contacts.length

    const contactsAfterRemove = contacts.filter(
      contact => contact.id !== contactId,
    )
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove),
      'utf8',
    )
    if (contactsAfterRemove.length !== previousLength) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.error(err)
  }
}
const updateContact = async (name, email, phone, id) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8')
    const contactsAfterChange = JSON.parse(contacts).map(contact => {
      if (contact.id === id) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
      return contact
    })
    await fs.writeFile(contactsPath, JSON.stringify(contactsAfterChange), 'utf8')
    return contactsAfterChange.find(contact => contact.id === id)
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact
}
