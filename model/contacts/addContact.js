// const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const getAll = require('./getAll.js')
// const contactsPath = require('./filePath.js')
const updateContact = require('./updateContact.js')

const addContact = async (data) => {
  try {
    const contacts = await getAll()
    const newContact = { ...data, id: nanoid() }
    contacts.push(newContact)
    console.table(newContact)

    await updateContact(contacts)
    console.table(await getAll())
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = addContact
