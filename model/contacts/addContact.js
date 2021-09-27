/* eslint-disable indent */
/* eslint-disable eol-last */
const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, './contacts.json')

const addContact = async(contactData) => {
    const contacts = await listContacts()
    const newId = contacts[contacts.length - 1].id + 1
    const newContact = { id: newId, ...contactData }

    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return newContact
}

module.exports = addContact