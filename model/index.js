const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const path = require('path')

const contactsPath = path.join('model', 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data.toString())
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())
    const [contact] = structuredData.filter((el) => {
      return el.id === Number(contactId)
    })
    return ({ contact })
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath)

    const structuredData = JSON.parse(data.toString())

    const newId = Number(Date.now().toString())
    const newContact = { id: newId, name: body.name, email: body.email, phone: body.phone }

    structuredData.push(newContact)

    fs.writeFile(contactsPath, JSON.stringify(structuredData, null, 2))

    return (newContact)
  } catch (err) {
    console.log(err.message)
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
