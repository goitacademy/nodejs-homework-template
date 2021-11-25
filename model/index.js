const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  if (!contacts) return null;
  const contactsParse = JSON.parse(contacts);
  return contactsParse;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === Number(contactId));
  if (!contactById) return null;
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === Number(contactId));
  if (indexContact === -1) return null;
  const [removedСontact] = contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedСontact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === Number(contactId));
  if (indexContact === -1) return null;
  contacts[indexContact] = { ...contacts[indexContact], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[indexContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
