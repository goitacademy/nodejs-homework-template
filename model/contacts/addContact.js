const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');

const shortid = require('shortid');

const { listContacts } = require('./listContacts');

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()

  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone,
  }
  const newListOfContacts = [...contacts, newContact]
  await fs.writeFile(contactsPath, JSON.stringify(newListOfContacts), 'utf-8')
  return newContact
}

module.exports = { addContact }
