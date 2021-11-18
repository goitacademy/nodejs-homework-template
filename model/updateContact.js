const listContacts = require('./listContacts')
const { checkNewContact, phoneToString } = require('../helpers/functions')
const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
const contactsPath = path.resolve(dbPath)

async function updateContact(id, { name, email, phone }) {
  let found = false
  id = parseInt(id)
  const contacts = await listContacts()
  const phoneString = phoneToString(phone)
  const patchedContact = { id, name, email, phone: phoneString }

  try {
    const checkData = checkNewContact(patchedContact, contacts, id)
    if (!checkData.result) throw new Error(checkData.message)

    const modifiedContacts = contacts.map(contact => {
      if (contact.id === patchedContact.id) {
        contact.name = patchedContact.name
        contact.email = patchedContact.email
        contact.phone = patchedContact.phone
        found = true
      }
      return contact
    })

    if (!found) throw new Error('Not found')
    fs.writeFile(contactsPath, JSON.stringify([...modifiedContacts]), 'utf8')
    console.log('contact successfully edited')
    return patchedContact
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = updateContact
