import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  // console.log("contacts :>> ", contacts);
  const results = contacts.find((contact) => contact.id === contactId);
  return results || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [results] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return results;
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
  await updateContacts(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...{ name, email, phone } };
  await updateContacts(contacts);
  return contacts[index];
};
