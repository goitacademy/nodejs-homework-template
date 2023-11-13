import fs from "fs/promises";
import { nanoid } from "nanoid";
import { resolve } from "path";

const contactsPath = resolve("models", "contacts.json");

const getContactIndex = (contacts, contactId) =>
  contacts.findIndex((contact) => contact.id === contactId);

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

export const removeContact = async (contactId) => {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsData);
    const index = getContactIndex(contacts, contactId);

    if (index === -1) return null;

    const [result] = contacts.splice(index, 1);
    updateContact(contacts);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const contactsBuffer = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsBuffer);
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContact(contacts);
  return contacts[index];
};
