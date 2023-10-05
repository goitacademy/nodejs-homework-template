import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

export const updateContacts = async (contacts) => {
  return await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactPath));
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return res;
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

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = {
    contactId,
    ...body,
  };
  await updateContacts(contacts);
  return contacts[index];
};
