import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
const contactsPath = path.resolve('models', 'contacts.json');

const updateContacts = async (contactList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const result = contactsList.find((contact) => contact.id === contactId);
  return result || null;
}
async function addContact({ name, email, phone }) {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactList.push(newContact);
  await updateContacts(contactList);
  return newContact;
}
async function removeContact(contactId) {
  const contactList = await listContacts();
  const filmIdx = contactList.findIndex((contact) => contact.id === contactId);
  if (filmIdx === -1) {
    return null;
  }
  const [result] = contactList.splice(filmIdx, 1);
  await updateContacts(contactList);
  return result;
}
async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContacts(contacts);
  return contacts[index];
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
