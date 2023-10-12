import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};
export const updateContacts = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);

  return contact || null;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

export const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = {
    id,
    ...body,
  };

  await updateContacts(contacts);
  return contacts[index];
};
