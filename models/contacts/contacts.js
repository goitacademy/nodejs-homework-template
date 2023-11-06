import fs from 'fs/promises'
import { nanoid } from 'nanoid';
import path from 'path';

const filePath = path.resolve("models", "contacts", "contacts.json");

const updateContacts = contacts => fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(filePath)
  return JSON.parse(data);
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone
  }
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

export const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if(index === -1){
      return null;
  }
  contacts[index] = {contactId, name, email, phone};
  console.log(contacts[index])
  await updateContacts(contacts);
  return contacts[index];
}