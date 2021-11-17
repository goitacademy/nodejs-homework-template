const listContacts = require('./listContacts')
const getContactById = require('./getContactById')
const { checkNewContact } = require('../helpers/functions')
const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
const contactsPath = path.resolve(dbPath)

async function updateContact(id, { name, email, phone }) {
  id = parseInt(id)
  const contacts = await listContacts()

  try {
    const targetContact = getContactById(id, contacts)
    if (!targetContact) throw new Error('Not found')
    if (phone.length !== 10) throw new Error('Incorrect phone number. Number must contain 10 didgit like 0123456789!')
    const phoneString = '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10)
    const patchedContact = { id, name, email, phone: phoneString }
    const checkData = checkNewContact(patchedContact, contacts, id)
    if (!checkData.result) throw new Error(checkData.message)

    fs.writeFile(contactsPath, JSON.stringify([...contacts, patchedContact]), 'utf8')
    console.log('contact successfully edited')
    return patchedContact
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = updateContact
