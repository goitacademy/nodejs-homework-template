const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const targetContact = contacts.find(({ id }) => id === contactId);
  return targetContact ?? null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (!~index) {
    return null;
  }
  const [data] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return data;
};

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };
  const contacts = await listContacts();
  const updateContacts = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (!~index) {
    return null;
  }
  const updateContacts = contacts.map((contact, idx) =>
    idx === index ? { ...contact, ...body } : contact
  );
  fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return updateContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
