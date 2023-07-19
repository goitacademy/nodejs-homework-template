import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const filePath = path.resolve("models", "contacts.json");

const updateContactsStorage = (contacts) =>
  fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

export const getContactsById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContacts = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await updateContactsStorage(contacts);
  return newContacts;
};

export const updateContactsById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContactsStorage(contacts);
  return contacts[index];
};

export const removeContact = async (id) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsStorage(contacts);
  return result;
};

export default {
  listContacts,
  getContactsById,
  addContacts,
  updateContactsById,
  removeContact,
};
