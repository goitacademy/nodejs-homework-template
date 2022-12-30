import { promises as fs } from 'fs';
import path from 'path';
import { uid } from 'uid';

const contactsPath = path.resolve('./models/contacts.json');

const getContacts = async () => {
  const dbContacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(dbContacts);
};

const keepContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
};

const listContacts = async () => {
  const contactList = await getContacts();
  return contactList || null;
};

const getContactById = async contactId => {
  const contactList = await getContacts();
  const contact = contactList.find(({ id }) => id === contactId);
  return contact;
};

const addContact = async contactData => {
  const newContact = { ...contactData, id: uid(6) };
  const contactList = await getContacts();
  contactList.push(newContact);
  await keepContacts(contactList);
  return newContact;
};

const updateContact = async contactToUpdate => {
  const { id } = contactToUpdate;

  const contactList = await getContacts();
  const contactIdx = contactList.findIndex(contact => contact.id === id);

  if (contactIdx === -1) return null;

  contactList[contactIdx] = { ...contactList[contactIdx], ...contactToUpdate };

  await keepContacts(contactList);
  return contactToUpdate;
};

const removeContact = async contactId => {
  const contactList = await getContacts();
  const updatedContactList = contactList.filter(({ id }) => id !== contactId);

  if (contactList.length === updatedContactList.length) return null;

  await keepContacts(updatedContactList);

  return contactId;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
