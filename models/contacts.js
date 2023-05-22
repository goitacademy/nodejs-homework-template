import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";

const contactsPath = join(process.cwd(), "models", "contacts.json");

const updateContacts = async (contacts) => {
  writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContact(contacts);
  return contacts[index];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
