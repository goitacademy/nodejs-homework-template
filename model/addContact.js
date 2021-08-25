const fs = require('fs/promises')

const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const generateId = arr => Math.max(...arr.map(contact => contact.id)) + 1

const addContact = async body => {
  const contactsList = await listContacts()
  const newContact = { ...body, id: generateId(contactsList) }
  await contactsList.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList))

  return newContact
}

module.export = addContact
