import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const oneContact = contacts.find((item) => item.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const deleteContact = await getContactById(contactId);
  const contacts = await listContacts();
  const updateContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));

  return deleteContact || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === String(id));
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...contacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
