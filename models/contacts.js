import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';
const contactsPath = path.resolve('models', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (error) {
    console.error('Error reading contacts:', error); 
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return null;
  }

  return foundContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  if (!deletedContact) {
    return null;
  }
  return deletedContact;
}

async function addContact(contactData) {
  const newContact = { id: nanoid(), ...contactData };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContact(contactId, contactData) {
   const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  if (!foundContact) {
    return null;
  }
   const updatedContact = { ...foundContact, ...contactData };
   const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? updatedContact : contact
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
