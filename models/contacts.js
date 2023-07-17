import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactWithId = contacts.find((obj) => obj.id === contactId);

  if (contactWithId) {
    return contactWithId;
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactWithId = contacts.find((obj) => obj.id === contactId);
  const filteredContacts = contacts.filter((obj) => obj.id !== contactId);
  if (contactWithId) {
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return contactWithId;
  } else {
    return null;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const contact = contacts.find((obj) => obj.id === id);
  if (contact === -1) {
    return null;
  }
  contacts[contact] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contact];
};

export default {
  getContactById,
  removeContact,
  listContacts,
  addContact,
  updateContact,
};
