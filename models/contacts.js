import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contactToRemove = await getContactById(contactId);
  if (!contactToRemove) {
    return null;
  }
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contactToRemove;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContactById(id, { name, email, phone }) {
  const contacts = await listContacts();
  const contactToUpdateIndex = contacts.findIndex(
    (contact) => contact.id === id
  );

  if (contactToUpdateIndex === -1) {
    return null;
  }

  const updatedContact = {
    id,
    name,
    email,
    phone,
  };

  contacts[contactToUpdateIndex] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
