const fs = require('fs/promises')
// const { v4 } = require('uuid')

const listContacts = require('./listContacts')
const contactsPath = require('../../db/filePath')

const addContact = async (name, email, phone) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newContact = { name, email, phone }
    const contacts = await listContacts()
    contacts.push(newContact)

    const contactsString = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, contactsString)

    console.table(newContact)
    return newContact
  } catch (error) {
    throw error
  }
}

module.exports = addContact
