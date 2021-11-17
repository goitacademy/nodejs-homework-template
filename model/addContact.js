const listContacts = require('./listContacts')
const { checkNewContact, getMaxId } = require('../helpers/functions')
const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
const contactsPath = path.resolve(dbPath)

async function addContact({ name, email, phone }) {
  const contacts = await listContacts()

  try {
    const id = getMaxId(contacts) + 1

    if (phone.length !== 10) throw new Error('Incorrect phone number. Number must contain 10 didgit like 0123456789!')
    const phoneString = '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10)
    const newContact = { id, name, email, phone: phoneString }
    const checkData = checkNewContact(newContact, contacts)
    if (!checkData.result) throw new Error(checkData.message)

    fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]), 'utf8')
    console.log('contact successfully created')
    return newContact
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = addContact
