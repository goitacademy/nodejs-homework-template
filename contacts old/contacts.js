import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const results = contacts.find((contact) => contact.id === contactId);
  return results || null;
};

export const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  // await updateContacts(contacts);
  updateContacts(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  // const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  // contacts[index] = { id: contactId, ...body };
  contacts[index] = { ...contacts[index], ...body };
  // await updateContacts(contacts);
  updateContacts(contacts);
  return contacts[index];
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [results] = contacts.splice(index, 1);
  // await updateContacts(contacts);
  updateContacts(contacts);
  return results;
};
