const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.resolve(__dirname, './contacts.json')
const writeContacts = async (contacts) => await fs
    .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    .catch(console.error)

const listContacts = async () => await fs
  .readFile(contactsPath, 'utf8')
  .then(JSON.parse)
  .catch(console.error);

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(it => contactId === it.id);
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const contact = {id: Date.now().toString(), name, email, phone};
  contacts.push(contact)
  await writeContacts(contacts)
  return contact;
}

const removeContact = async (contactId) => {
  console.log('removeContact id', contactId)
  const contacts = await listContacts();
  const index = contacts.findIndex(it => contactId === it.id);
  console.log('index', index)
  const removableContact = contacts[index];
  contacts.splice(index, 1);
  await writeContacts(contacts)
  return removableContact || false;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(it => contactId === it.id);
  contacts[index] = {...body, id: contactId};
  await writeContacts(contacts)
  return contacts[index] || false;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
