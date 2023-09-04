import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");

const updateALLContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export const listContacts = async () => {
  const datalistContacts = await fs.readFile(contactsPath);
  return JSON.parse(datalistContacts);
};

export const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === id);
  return contactById || null;
};

export const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateALLContacts(allContacts);
  return newContact;
};

export const updateContactById = async (id, body) => {
  const allContacts = await listContacts();
  const indexContact = allContacts.findIndex((contact) => contact.id === id);
  if (indexContact === -1) {
    return null;
  }
  console.log(indexContact);
  allContacts[indexContact] = { id, ...body };
  await updateALLContacts(allContacts);
  return allContacts[indexContact];
};

export const removeContactById = async (id) => {
  const allContacts = await listContacts();

  const indexContact = allContacts.findIndex((item) => item.id === id);
  if (indexContact === -1) {
    return null;
  }
  const [result] = allContacts.splice(indexContact, 1);
  await updateALLContacts(allContacts);
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
