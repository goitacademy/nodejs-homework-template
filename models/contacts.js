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
  return contact || null;
};

const addContact = async contactData => {
  const newContact = { ...contactData, id: uid(6) };
  const contactList = await getContacts();
  contactList.push(newContact);
  await keepContacts(contactList);
  return newContact || null;
};

const updateContact = async contactToUpdate => {
  const { contactId, name, phone, email } = contactToUpdate;

  const contactList = await getContacts();
  const contact = contactList.find(({ id }) => id === contactId);

  if (!contact) return null;

  contactList.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });

  await keepContacts(contactList);
  return contactToUpdate;
};

const removeContact = async contactId => {
  const contactList = await getContacts();
  const contact = contactList.find(({ id }) => id === contactId);

  if (!contact) return null;

  const updatedContactList = contactList.filter(({ id }) => id !== contactId);

  await keepContacts(updatedContactList);

  return contact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
