import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("models", "contacts.json");

const writeContactsToFile = async (contacts) => {
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath);
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Unable to read contacts file.");
  }
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
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
  await writeContactsToFile(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...body };
  await writeContactsToFile(contacts);
  return contacts[index];
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await writeContactsToFile(contacts);
  return removedContact;
};
