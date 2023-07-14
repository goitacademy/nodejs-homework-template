import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const filepath = path.resolve("models", "contacts", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await updateContact(contacts);
  return newContacts;
};

export const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContact(contacts);
  return contacts[index];
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
};

export default {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
