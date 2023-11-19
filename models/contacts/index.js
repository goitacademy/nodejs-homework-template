import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts", "contacts.json");
const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
console.log(listContacts);

const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id) || null;
};
console.log(getContactById);

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
console.log(addContact);

const removeContactById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};
console.log(removeContactById);

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);
  return contacts[index];
};
console.log(updateContactById);

export default {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
