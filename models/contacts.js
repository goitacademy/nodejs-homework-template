const fs = require('fs/promises');
const { string } = require('joi');
const { nanoid } = require('nanoid');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts)
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const getContact = contacts.find(contact => contact.id === id);
  return getContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(contact => (contact.id === id))
  if (index === -1) {
    return null
  }
  const [removedContact] = contacts.splice(index, 1)
  await updateContacts(contacts)
  return removedContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = String(contactId);
  const index = contacts.findIndex(contact => contact.id === id)
  if (index === -1) {
    return null;
  }
  const { name, email, phone } = body;
  contacts[index] = { id: contactId, name, email, phone }
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
