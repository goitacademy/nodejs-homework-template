const fs = require('fs/promises')
const path = require('path')

const CONTACTS_PATH = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(CONTACTS_PATH);
  if(!contacts.toString()) return []
  return JSON.parse(contacts)
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: Date.now().toString(32), ...body };
  contacts.push(newContact)
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts))
  return newContact
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({id}) => id === contactId) || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) return null
  const deleteContact = contacts.splice(idx, 1);
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts))
  return deleteContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) return null;
  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
