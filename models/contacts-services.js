import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "./contacts.json");
const updateContactList = (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const getContactsList = async () => {
  const contactsList = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsList);
};

const getContactById = async (id) => {
  const contacts = await getContactsList();
  const contactById = contacts.find((item) => item.id === id);
  return contactById || null;
};

const removeContact = async (id) => {
  const contacts = await getContactsList();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  updateContactList(contacts);
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateContactList(contacts);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await getContactsList();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContactList(contacts);
  return contacts[index];
};

export default {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
