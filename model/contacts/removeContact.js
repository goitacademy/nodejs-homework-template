const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');

const { listContacts } = require('./listContacts');
const { getContactById } = require('./getContactById');

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contact = await getContactById(contactId)

  if (!contact) {
    return undefined
  }
  const newListOfContacts = contacts.filter(item => String(item.id) !== String(contactId))

  await fs.writeFile(contactsPath, JSON.stringify(newListOfContacts), 'utf-8')

  return contact
}

module.exports = { removeContact }
