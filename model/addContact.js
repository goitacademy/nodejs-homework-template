const listContacts = require('./listContacts')
const { checkNewContact, getMaxId } = require('../helpers/functions')
const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
const contactsPath = path.resolve(dbPath)

async function addContact({ name, email, phone }) {
  const contacts = await listContacts()
  const id = getMaxId(contacts) + 1
  const phoneString = '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10)
  const newContact = { id, name, email, phone: phoneString }

  try {
    const checkData = checkNewContact(newContact, contacts)
    if (!checkData.result) throw new Error(checkData.message)

    fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]))
    console.log('contact successfully created')
    return newContact
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = addContact
