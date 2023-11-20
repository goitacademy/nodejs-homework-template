import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsFile = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContactsFile(contacts);
  return result;
}

export const addContact = async (body) => {
  const contacts = await listContacts();

  if (!body.name || !body.email || !body.phone) {
    throw new Error("Name, email, and phone are required fields");
  }

  const newContact = { id: nanoid(), ...body };

  contacts.push(newContact);
  await updateContactsFile(contacts);

  return newContact;
}


export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;

  await updateContactsFile(contacts);

  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
