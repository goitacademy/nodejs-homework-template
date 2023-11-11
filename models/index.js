import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

export const getListContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

export const getContactById = async (id) => {
  const contacts = await getListContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
};

export const removeContact = async (id) => {
  const contacts = await getListContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
}

export const addContact = async ({ name, email, phone }) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export default {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
