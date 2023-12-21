import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
// const contacts = require('./contacts.json')

import { resolve } from "path";

const contactsPath = resolve("models", "contacts.json");
// console.log(contactsPath);
const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

// const getContactById = async (contactId) => {}
const getContactById = async (contactId) => {
  const allContact = await listContacts();
  const result = allContact.find((item) => item.id === contactId);
  console.log(result);
  return result || null;
};
const removeContact = async (contactId) => {
  const allContact = await listContacts();
  const index = allContact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContact.splice(index, 1);
  console.log(result);
  await writeFile(contactsPath, JSON.stringify(allContact, null, 2));
  return result;
};
const addContact = async ({ name, email, phone }) => {
  const allContact = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContact.push(newContact);
  await writeFile(contactsPath, JSON.stringify(allContact, null, 2));

  return newContact;
};
const updateContact = async (contactId, body) => {
  const allContact = await listContacts();
  const index = allContact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const newContact = {
    id: contactId,
    ...allContact[index],
    ...body,
  };
  await writeFile(contactsPath, JSON.stringify(allContact, null, 2));
  return newContact;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
