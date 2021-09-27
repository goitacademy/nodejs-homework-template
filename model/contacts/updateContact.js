const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve('./db/contacts.json');

const { listContacts } = require('./listContacts')
const { getContactById } = require('./getContactById')

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contact = await getContactById(contactId)

  const updatedContact = { ...contact, ...body }
  const updatedListOfContacts = contacts.filter(contact => String(contact.id) !== String(contactId))

  await fs.writeFile(contactsPath, JSON.stringify([...updatedListOfContacts, updatedContact]), 'utf-8')
  return updatedContact
}

module.exports = { updateContact }
